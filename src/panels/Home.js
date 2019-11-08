import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import connect from '@vkontakte/vk-connect';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import List from '@vkontakte/vkui/dist/components/List/List';
import TextArea from '@vkontakte/vkui/dist/components/TextArea/TextArea';

const sendReq= e => {

	Home.props.go(e);
};
const Home = (props) => (
	<Panel id={props.id}>
		<PanelHeader>{props.fetchedGroup}</PanelHeader>
		
		<Group title="Новая заявка"
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
				<Button size="xl" level="2" onClick={sendReq} data-to="GoodRequest">
					Отправить
				</Button>
			</Div>
		</Group>
			{!props.isMemberGroup && <Div id="memberGroupButton">
				<Button size="xl" level="2" onClick={()=>connect.sendPromise("VKWebAppJoinGroup", {"group_id": 139136005})
				.then(data => { if (data.result===true){document.getElementById("memberGroupButton").remove();}})}>
					Вступить в группу
				</Button>
			</Div>}
			{(props.isEditor || props.isAdmin)
			&&
			<Div>
				<Button size="xl" level="outline" onClick={props.go} data-to="Requests">
					Заявки
				</Button>
			</Div>}
			{props.isAdmin
			&&<Div>
				<Button size="xl" level="commerce" onClick={props.go} data-to="Accounting">
					Бухгалтерия
				</Button>
			</Div>}
			{(props.isEditor || props.isAdmin)
			&&<Div>
				<Button size="xl" level="destructive" onClick={props.go} data-to="Payments">
					Оплаты
				</Button>
			</Div>}
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		id: PropTypes.number,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
	fetchedGroup: PropTypes.string.isRequired,
	isEditor: PropTypes.bool,
	isAdmin: PropTypes.bool,
	isMemberGroup: PropTypes.bool,
};

export default Home;
