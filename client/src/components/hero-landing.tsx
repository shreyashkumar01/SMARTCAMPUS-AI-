import Link from "next/link"
import Container from "./common/container"
import { Button } from "./ui/button"
import { Heading } from "./ui/heading"
import {SubHeading} from "./ui/sub-heading"
import { FiExternalLink } from "react-icons/fi"
import Image from "next/image"
import { unstable_noStore } from "next/cache"
const HeroLanding = () => {
    unstable_noStore()
    return (
        <Container size="full" as={"section"} className="blur-in">
            <Heading size="2xl" align="center" className=" md:text-5xl text-shadow-md lg:text-6xl mt-20">
                 Something's Broken?<br /> Let Us Know!
            </Heading>
            <SubHeading align="center"  className="mt-2 text-xs md:text-sm">
                Encountered a bug or noticed something that doesn't work as expected? <br />
                Your feedback is valuable to us—report an issue below and help us build a better experience for everyone!
            </SubHeading>
            <Container size="full" className="flex gap-2 flew-wrap w-fit">
            <Button asChild>
                <Link href={"/dashboard"} className="text-white bg-linear-to-br from-blue-500 to-blue-600 flex items-center gap-2">
                    Report Issue
                    <span>
                      
                        <FiExternalLink className="inline-block ml-1" />
                    </span>
                </Link>
            </Button>
            <Button variant={"outline"}>
                <Link href={"/admin"}>Admin? View Issue
                <span>
                      
                      <FiExternalLink className="inline-block ml-1" />
                  </span></Link>
            </Button>
            </Container>
        
        </Container>
    )
}

export {
    HeroLanding 
}