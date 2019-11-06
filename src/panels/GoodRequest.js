import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Link from '@vkontakte/vkui/dist/components/Link/Link';

const osName = platform();

const GoodRequest = props => (
	<Panel id={props.id}>
		<PanelHeader
			left={<HeaderButton onClick={props.go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Shop Schrodinger. Прием заказов.
		</PanelHeader>
		<Group
		description="Заявка успешно принята.">
			<Div>
				<Button size="xl" level="2" onClick={props.go} data-to="home">
					Сделать еще заказ
				</Button>	
			</Div>
			
			<Div>
				<Button size="xl" level="2" level="secondary">
					<Link href='https://vk.com/shopschrodinger'>Завершить</Link>
				</Button>				
			</Div>
		</Group>
	</Panel>
);

GoodRequest.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default GoodRequest;
