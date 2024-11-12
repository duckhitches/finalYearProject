'use server'

import { Button } from "@mui/base";



export default function NotFound(){
    return(
        <div>
            <h1>This page cannot be loaded.</h1>
            <Button href="/"/>
        </div>
            
    )
}