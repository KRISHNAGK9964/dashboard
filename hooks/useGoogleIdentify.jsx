import { useEffect, useState } from "react"
import {useSession, signIn} from 'next-auth/react';
// require('dotenv').config();
// interface props {
//     nextAuthOpt:{redirect: boolean},
//     googleOpt:{
//         prompt_parent_id : string,
//     isOneTap : boolean
//     }

// }
const useGoogleIdentify = (props) =>{

    const url = 'https://accounts.google.com/gsi/client'
    const {data: session} = useSession();
    const [isLoading , setIsLoading] = useState();
    const [isSignedIn, setIsSignedIn] = useState();
    const {nextAuthOpt , googleOpt} = props || {}

    useEffect(()=> {
        if(session){
            setIsSignedIn(true)
        }
    },[session])

    useEffect(()=>{
        // add Google identify script
        let script = document.createElement('script');
        script.src = url
        script.async = true
        document.head.appendChild(script)

        //initialize Google
        if(!isLoading && !isSignedIn){
            const {google} = window;
            if(google){
                google.accounts.id.initialize({
                    client_id: "65768031415-lt5ia5bkvofqrr5e70mk0du98eef19ap.apps.googleusercontent.com",
                    callback: async (response) => {
                        setIsLoading(true)
                        //call provider with the token provided by google
                        await signIn('dashboard',{
                            credential: response.credential,
                            ...nextAuthOpt
                        })

                        setIsLoading(false)
                    },
                    ...googleOpt

                })

                // prompt one tap

                if(googleOpt.isOneTap){
                    google.accounts.id.prompt((notification) => {
                        if(notification.isNotDisplayed()){
                            console.log('getNotDisplayedReason: ', notification.getNotDisplayedReason())
                        }else if(notification.isSkippedMoment()){
                            console.log('isSkippedMoment: ', notification.getSkippedReason());
                        }else if(notification.isDismissedMoment()){
                            console.log('isDismissedMoment: ', notification.getDismissedReason());
                        }
                    })
                }
            }
        }
    },[googleOpt,isLoading,isSignedIn,nextAuthOpt])

    return {isLoading , isSignedIn}
}

export default useGoogleIdentify;