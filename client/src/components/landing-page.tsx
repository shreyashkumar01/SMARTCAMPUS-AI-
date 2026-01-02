import Container from "./common/container"
import NavBar from "./common/navbar"
import { Features } from "./features";
import { HeroLanding } from "./hero-landing";

const LandingPage = () =>{
    return (
        <Container size="xtraLarge" padding="small">
            <NavBar />
            <HeroLanding />
            <Features />
        </Container>
        
    )
}


export default LandingPage;