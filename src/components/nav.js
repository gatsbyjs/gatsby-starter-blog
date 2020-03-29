import React, { useEffect } from "react"
import { rhythm } from "../utils/typography"
import { Link } from 'gatsby'
import './nav.css';







const Nav = ({tag, location}) => {
    console.log("navtag", tag)
    console.log("location", location)
    
    let current
    useEffect(()=>{
        current = document.getElementById(tag) 
        const changeFirstCategory  = ()=>{
            document.getElementById('all').innerText = tag
            document.getElementById('all').parentElement.classList.add('navBox-active')
        }
        const changeFirstCategoryToAll = () =>{
            
            document.getElementById('all').parentElement.classList.add('navBox-active')
        }
        console.log("current",current)
        current?
        current.parentElement.classList.add('navBox-active') : 
        location && location.pathname =="/" ?
        changeFirstCategoryToAll()
        :
        changeFirstCategory()
    },[]
    )


  return (
    <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: rhythm(1),
    }}>
<div className='navWrapper'>
    <div className="navBox" >
        <Link id={"all"} to={'/'} >
                all
        </Link>
    </div>

    <div className="navBox">
         <Link id={'algorithm'} to={'tags/algorithm'}>
                algorithm
                </Link>
        
    </div>
    <div className="navBox">
        <Link id={'knowledge'} to={'tags/knowledge'}>knowledge</Link>
    </div>

    <div className="navBox" style={{
        
    }}>
        <Link id={'Java Script'} to={'tags/java-script'}>JS</Link>
    </div>
    <div className="navBox navBox-end">
         1
    </div>
    
</div>

    </div>
    
  )
}

export default Nav
