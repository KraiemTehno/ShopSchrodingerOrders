import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import List from '@vkontakte/vkui/dist/components/List/List';
import Link from '@vkontakte/vkui/dist/components/Link/Link';
import TextArea from '@vkontakte/vkui/dist/components/TextArea/TextArea';
import './Home.css';

const Home = (props) => (
	<Panel id={props.id}>
		<PanelHeader>Shop Schrodinger. Прием заказов.</PanelHeader>
		
		<Group  title="Новая заявка"
		description="Заполните как можно более подробно чтобы мы рассмотрели вашу заявку быстрее.">
			<List>
				<Cell>
					Что хочешь?
					<TextArea id='Commodity'/>
				</Cell>
				<Cell>
					Когда хочешь?
					<TextArea id='CommodityEndDate'/>
				</Cell>
				<Cell>
					Пожелания к заказу
					<TextArea id='CommodityDescription'/>
				</Cell>	
			</List>
			<Div>
				<Button size="xl" level="2" onClick={props.go} data-to="goodRequest">
					Отправить
				</Button>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
