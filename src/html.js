import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          !function(){const n=window,i="__REACT_DEVTOOLS_GLOBAL_HOOK__",o="__PlasmicPreambleVersion",t=function(){}
  if(void 0!==n){if(n.parent!==n)try{n[i]=n.parent[i]}catch(e){}if(!n[i]){const r=new Map
  n[i]={supportsFiber:!0,renderers:r,inject:function(n){r.set(r.size+1,n)},onCommitFiberRoot:t,onCommitFiberUnmount:t}}n[i][o]||(n[i][o]
="1")}}()`,
          }}
        ></script>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
