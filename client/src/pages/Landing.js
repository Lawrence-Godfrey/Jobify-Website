import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import styled from 'styled-components';


const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <img src={logo} alt="jobify" className='logo' />
            </nav>
            <div className="container">
                <div className="info">
                    <h1>job <span>tacking</span> app</h1>
                    <p>
                        I'm baby poutine tumblr adaptogen prism yuccie. Asymmetrical jean shorts coloring book man braid. Cronut venmo kickstarter flexitarian, pitchfork poke freegan. Sartorial tousled cliche distillery. Try-hard mixtape truffaut messenger bag chia, typewriter forage church-key. DSA crucifix kitsch, tumeric vegan tacos normcore synth distillery. Before they sold out craft beer brunch crucifix umami gluten-free pok pok poke artisan selvage pug.
                    </p>
                    <button className='btn btn-hero'>
                        Login / Register
                    </button>
                </div>
                <img src={main} alt="job hunt" className='img main-img'/>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`

export default Landing;