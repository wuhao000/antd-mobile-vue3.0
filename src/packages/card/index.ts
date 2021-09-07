import {App} from 'vue';
import MCard from './src';
import Body from './src/body';
import Footer from './src/footer';
import Header from './src/header';
import './style';

MCard.Body = Body;
MCard.Header = Header;
MCard.Footer = Footer;
MCard.install = (app: App) => {
  app.component(MCard.name, MCard);
  app.component(Body.name, MCard.Body);
  app.component(Header.name, MCard.Header);
  app.component(Footer.name, MCard.Footer);
};

export default MCard;
