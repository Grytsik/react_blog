import telg from '../../img/telegram.png';
import insta from '../../img/instagram.png';
import '../Footer/Footer.scss';

export default function Footer() {
	return (
		<div className="footer">
			<div className="footer__container container">
				<div className="footer__item">
					<h3 className='footer__title'>Email</h3>
					<p className='footer__text'>gryyytsik@gmail.com</p>
				</div>
				<div className="footer__item">
					<h3 className='footer__title'>Frontend Developer</h3>
					<p className='footer__text'>(c)Copyright. All rights reserved</p>
				</div>
				<div className="footer__item">
					<div>
						<h3 className='footer__title'>Connect with me</h3>
						<a href="https://t.me/gritsyk">
							<img className='footer__social' src={telg} alt="telegram" />
						</a>
						<a href="https://instagram.com/twen.marcos23?igshid=YmMyMTA2M2Y=">
							<img className='footer__social' src={insta} alt="instagram"/>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}