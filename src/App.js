import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Link from 'linq/linq';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import GoodRequest from './panels/GoodRequest';
import Requests from './panels/Requests';
import Payments from './panels/Payments';
import Accounting from './panels/Accounting';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const fetchedGroup = "Shop Schrodinger. Прием заказов.";
	const groupId = 139136005;
	const [isEditor, setIsEditor] = useState(null);
	const [isAdmin, setIsAdmin] = useState(null);
	const [isMemberGroup, setIsMemberGroup] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='small' />);

	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const key = "ce2c291f08640a25b548655e0e4552a935dc065d5d4c0204e2742721d040c37d5313d2a01eaa77f448757";
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			const responseManagers  = await connect.sendPromise("VKWebAppCallAPIMethod", 
			{"method": "groups.getMembers",
			"request_id": "2",
			"params": {"extended": "1",
						"group_id": groupId,
						"filter": "managers",
						"count": 10,
						"sort": "id_asc",
						"offset": 0,
						"fields": "",
			 			"v": "5.103",
						"access_token": key
					}
			});
			const isEditor = Link.from(responseManagers.response.items).any(i => i.id == user.id && i.role == "editor");
			const isAdmin = Link.from(responseManagers.response.items).any(i => i.id == user.id && (i.role == "creator" || i.role == "administrator"));
			const responseIsMemberGroup = await connect.sendPromise("VKWebAppCallAPIMethod", 
			{"method": "groups.isMember",
			"request_id": "3",
			"params": {"extended": "1",
			 			"user_id": user.id,
						"group_id": groupId,
						"user_ids": "",
			 			"v":"5.103",
						"access_token": key
					}
			});

			setUser(user);
			setIsMemberGroup(responseIsMemberGroup.response.member===1);
			setIsEditor(isEditor);
			setIsAdmin(isAdmin);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} fetchedGroup={fetchedGroup} isMemberGroup={isMemberGroup} isEditor={isEditor} isAdmin={isAdmin}/>
			<GoodRequest id='GoodRequest' go={go} fetchedUser={fetchedUser} fetchedGroup={fetchedGroup}/>
			<Requests id='Requests' go={go} fetchedUser={fetchedUser} fetchedGroup={fetchedGroup}/>
			<Payments id='Payments' go={go} fetchedUser={fetchedUser} fetchedGroup={fetchedGroup}/>
			<Accounting id='Accounting' go={go} fetchedUser={fetchedUser} fetchedGroup={fetchedGroup}/>
		</View>
	);
}

export default App;

