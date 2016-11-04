'use strict';

const recursive         = require('recursive-readdir');
const cheerio           = require('cheerio');
const fs                = require('fs');
const sizeOf            = require('image-size');
const request           = require('sync-request');
const rmdir             = require('rimraf');
const mkdirp            = require('mkdirp');
const sass              = require('node-sass');

//  The director that we will be creating an amp verion of.
//  Creating an amp version ultimately means creating an 'amp'
//  directory in that with amp versions of each file from the source.
const inputDir = 'public';
const outputDir   = 'amp';

// Directories within the inputDir that we will not be ampifying
const ignoreDirs = [
];

// This is where we will populate the last of files to convert
let filesToConvert = [];

/**
 * Adds a link to the amp version of the page to the head of the html document
 *
 * @param {string} html The content of the HTML file
 * @param {string} filePath The path to the HTML file
 * @returns {string} HTML with the amp version linked to in the head
 */
const addAmpVersionLink = function(html, filePath) {
  // Load the html so we can manipulate it with jQuery syntax on the server
  const $ = cheerio.load(html, {
    normalizeWhitespace: false,
    xmlMode: false,
    decodeEntities: false,
    round: true,
  });

  // Since content is served from the public directory, we don't
  // want that part in the URL so let's remove that to get the URL
  const urlPath = filePath.replace(inputDir, '');

  // Create the URL for the amp version
  let ampVersionUrl = `/${outputDir}${urlPath}` 

  // Remove the index.html portion as it's uneeded
  ampVersionUrl = ampVersionUrl.substring(0, ampVersionUrl.lastIndexOf("/")) + '/';

  // Add the  amp version link to the head
  if ($('head link[rel="amphtml"]').length === 0) {
    $('head').append(`<link rel="amphtml" href="${ampVersionUrl}" />`);
  }

  return $.html();
}

const ampify = function(html, filePath) {
  var $;
  var round;

  // The tags that we will convert to amp versions
  const tags = {
    amp: ['img', 'video']
  };
  
  // Load the html so we can manipulate it with jQuery syntax on the server
  $ = cheerio.load(html, {
    normalizeWhitespace: false,
    xmlMode: false,
    decodeEntities: false,
    cwd: '',
    round: true,
  });

  round = function(numb) { return Math.round(numb / 5) * 5; }
  
  /**************************************************************************************
   * GROUNDWORK
   *************************************************************************************/
  //remove all script tags. If any specific script tags are needed
  //they can be added back later. This gives us a clean slate though
  $('script').remove();

  //Add the amp attribute to the html
  $('html').attr('amp', '');

  //Add the required meta charset tags if not already present
  if ($('head meta[charset="utf-8"]').length === 0) {
    $('head').append('<meta charset="utf-8">');
  }

  // The amp version of the site should not have any amphtml.
  // We'll set the correct canonical link later
  $('head').find(`link[rel='amphtml']`).remove();
  $('head').find(`link[rel='canonical']`).remove();

  // Add the canonical link to the URL as specified by the AMP standards
  const urlPath = filePath.replace(inputDir, ''); // No inputDir in the URL
  const minimalPath = urlPath.substring(0, urlPath.lastIndexOf("/")) + '/'; // No index.html at the end
  $('head').append(`<link rel="canonical" href="${minimalPath}" />`);

  // If the viewport meta isn't correctly set in regards to the amp standards, then set it
  if ($('head meta[content="width=device-width,minimum-scale=1,initial-scale=1"]').length === 0) {
    // Remove the viewport meta if it exists
    $('head meta[name="viewport"]').remove();
    // Add the correct viewport meta
    $('head').prepend('<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">');
  }

  // add the main amp library
  if ($('head script[src="https://cdn.ampproject.org/v0.js"]').length === 0) {
    $('head').append('<script async src="https://cdn.ampproject.org/v0.js"></script>');
  }

  /**************************************************************************************
   * STYLES
   *************************************************************************************/
  // We are using Sass so we need to get each of the styles we need for the amp version of the pages
  // and compile it to minified sass.
  
  var css = sass.renderSync({file: 'css/zenburn.css', outputStyle: 'compressed'}).css.toString() +
            sass.renderSync({file: 'css/amponly.scss', outputStyle: 'compressed'}).css.toString();

  // Remove our styles and add them to the css we are going to put in the custom amp
  // style element
  $("style").each(function(){
    css+= $(this).html();
  });
  $("style").remove();

  // Remove all important tags since they are not permitted in amp styles
  css = css.replace(/!important/g, '');

  // Add our new style to the head as required my amp
  $("head").prepend(`<style amp-custom>${css}</style>`);

  // Add the required amp boiler plate
  if ($('head style[amp-boilerplate]').length === 0) {
    $('head').prepend('<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>');
  }

  // Remove any styles we have that weren't added the 'amp' way
  $('link[rel=stylesheet]').each(function() {
      $(this).remove();
  });
  
  // Add any needed fonts
  $("head").append($('<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans%3A400%2C700%2C300%2C800&ver=4.6.1" />'));

  // remove style attributes from everything. No inline styles with amp
  $( "*" ).removeAttr('style');

  
  /**************************************************************************************
   * IMAGES
   *************************************************************************************/
  // We need to find any image without dimensions and fix that. It will make things more
  // consistent once we add the amp layouts
  $('img:not([width]), img:not([height])').each(function() {
    const src = $(this).attr('src');
    let width;
    let height;
    
    // if the image is a URL we need to get that data and get the size of that image
    if (src.includes('//')) {
      let imageUrl = src;

      // We need to add the protocol to any urls that don't have them
      if(src.startsWith('//')) {
        imageUrl = `http:${src}` ;
      }
      
      // To save build time, we're going to preset some of the values
      // that we already know.
      if($(this).hasClass('author-img')) {
        width = 50;
        height = 50;
      // If not precomputed, we will need to get that data and get the image size
      } else { 
        const response = request('GET', imageUrl);

        if (response.statusCode === 200) {
          const size = sizeOf(response.body);
          width = size.width;
          height = size.height;
        }
      }
    // if we're dealing with a local file
    } else {
      const src = $(this).attr('src');
      let imageUrl;

      // Static file images will come straight from the static directory with no minimal path
      if(src.startsWith('/static')) {
        imageUrl = `${process.cwd()}/${inputDir}/${src.substr(1).split('?')[0]}`;
      // Any other images will come from the public directory
      } else {
        imageUrl = `${process.cwd()}/${inputDir}${minimalPath}${src.substr().split('?')[0]}`;
      }

      if (fs.existsSync(imageUrl)) {
        const size = sizeOf(imageUrl);

        width = size.width;
        height = size.height;
        
        // For images that are relative to the page they are on, we need to add the
        // relative path to the domain root, otherwise amp will freak out since we aren't
        // copying images, just HTML
        if(src.startsWith('/') === false) {
          $(this).attr({
            src: minimalPath + src,
          });
        }
      }
    };
    
    // If width and height were set, add it to the image
    if(width && height) {
      $(this).attr({
        width: round(width),
        height: round(height)
      });
    // if not, remove the image because something went wrong and it has no height or width
    // which will fluster AMP
    } else {
      $(this).remove();
    }
  });

  /**************************************************************************************
   * AMP CONVERSIONS
   *************************************************************************************/
  // convert img tags to amp-img tags and video tags to amp-video tags, etc.
  $(tags.amp.join(',')).each(function() {
    this.name = 'amp-' + this.name;
  });
  
  // Set the layouts for all the images
  $('.main-pane amp-img, .page amp-img').each(function(){
    if($(this).attr('data-layout')) {
      $(this).attr('layout', $(this).attr('data-layout'));
    } else {
      // For images that are really large, let them be responsive and allow them to go full screen
      // Fixed images that are really large don't scale down well with AMP for some reason. So this
      // is somewhat of a hack fix
      if($(this).attr('width') > 700 ) {
        $(this).attr('layout', 'responsive');
      // For most images, just let them be fixed and css will scale them down
      } else {
        $(this).attr('layout', 'fixed');
      }
    }
  });

  /**************************************************************************************
   * Replace certain elements on the page for AMP specifically
   *************************************************************************************/

  /**************************************************************************************
   * DONE
   *************************************************************************************/
  return $.html();
}

// Get a list of all the files in the public directory. But ignore the amp dir
recursive(inputDir, ['amp'], function (err, files) {
  // Remove the directories we are going to ignore
  files = files.filter((file) => {
    let ignore = false;

    for(let ignoreDir of ignoreDirs) {
      if(file.startsWith(inputDir+ignoreDir)) {
        ignore = true;
        break;
      }
    }

    return !ignore;
  });

  // Files is an array of file paths. Lets just get the html files
  for (let file of files) {
    // Only select files that end in '.html'.
    if(file.endsWith('.html')) {
      filesToConvert.push(file);
    }
  }

  // Remove amp dir before we rebuild it
  try {
    rmdir.sync(`${process.cwd()}/${inputDir}/${outputDir}`);
  } 
  catch(err) {
    console.log(err);
  }

  // For each file, modify it to add the amp page reference and then create the amp
  // version
  for(let fileToConvert of filesToConvert) {
    const contents = fs.readFileSync(fileToConvert, 'utf8');

    // Need to make sure the amp versions of files are in the amp dir
    const newFileLocation = fileToConvert.replace(`${inputDir}/`, `${inputDir}/${outputDir}/`);
    
    // Create the directory if it doesn't exist
    const newDir = newFileLocation.substring(0, newFileLocation.lastIndexOf("/"));
    if (!fs.existsSync(newDir)){
      mkdirp.sync(newDir);
    }

    // Add the amp url link to the top of the page then Save the file
    fs.writeFileSync(newFileLocation, ampify(contents, fileToConvert), 'utf8');

    // Add the amp url link to the top of original file
    fs.writeFileSync(fileToConvert, addAmpVersionLink(contents, fileToConvert), 'utf8');
  }
  console.log('The site is now AMP ready');
});
