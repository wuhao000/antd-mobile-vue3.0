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
  app.component('MCard', MCard);
  app.component('MCardBody', MCard.Body);
  app.component('MCardHeader', MCard.Header);
  app.component('MCardFooter', MCard.Footer);
};

export default MCard;
