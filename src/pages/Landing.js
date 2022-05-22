import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container">
                <div className="info">
                    <h1>job <span>tracking</span> app</h1>
                    <p>
                        I'm baby poutine tumblr adaptogen prism yuccie. Asymmetrical jean shorts coloring book man braid. Cronut venmo kickstarter flexitarian, pitchfork poke freegan. Sartorial tousled cliche distillery. Try-hard mixtape truffaut messenger bag chia, typewriter forage church-key. DSA crucifix kitsch, tumeric vegan tacos normcore synth distillery. Before they sold out craft beer brunch crucifix umami gluten-free pok pok poke artisan selvage pug.
                    </p>
                    <Link to={"/register"} className='btn btn-hero'>
                        Login / Register
                    </Link>
                </div>
                <img src={main} alt="job hunt" className='img main-img'/>
            </div>
        </Wrapper>
    );
};

export default Landing;