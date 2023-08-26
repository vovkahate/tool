Если вы хотите, чтобы билеты отображались сразу, а новые билеты, соответствующие фильтрам, занимали свое место по мере их загрузки, вам потребуется использовать инкрементальную отрисовку.

Вот пример, как это можно сделать:

В вашем компоненте, отвечающем за отображение билетов, вы можете использовать состояние, чтобы хранить текущие билеты и новые билеты, которые будут постепенно добавляться:
📋 Copy code➕ Insert code
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTickets } from "./actions";

function TicketsList() {
const dispatch = useDispatch();
const tickets = useSelector((state) => state.tickets);
const [newTickets, setNewTickets] = useState([]);

useEffect(() => {
dispatch(fetchTickets());
}, []);

useEffect(() => {
if (newTickets.length > 0) {
const timer = setTimeout(() => {
setNewTickets([]);
}, 1000);

      return () => clearTimeout(timer);
    }

}, [newTickets]);

const handleNewTickets = (newTickets) => {
setNewTickets((prevNewTickets) => [...prevNewTickets, ...newTickets]);
};

return (
<div>
{tickets.map((ticket) => (
<Ticket key={ticket.id} ticket={ticket} />
))}
{newTickets.map((ticket) => (
<Ticket key={ticket.id} ticket={ticket} />
))}
</div>
);
}

export default TicketsList;
В вашем действии fetchTickets, которое запускает процесс загрузки билетов, вы можете использовать асинхронные запросы для загрузки данных и вызывать функцию handleNewTickets для добавления новых билетов:
📋 Copy code➕ Insert code
export const fetchTickets = () => {
return async (dispatch) => {
try {
const response = await fetch("your-api-url");
const data = await response.json();

      dispatch({ type: "SET_TICKETS", payload: data });
    } catch (error) {
      // Обработка ошибок
    }

};
};
В вашем редюсере вы можете обновить состояние билетов, добавляя новые билеты к текущему списку:
📋 Copy code➕ Insert code
const initialState = {
tickets: [],
};

const ticketsReducer = (state = initialState, action) => {
switch (action.type) {
case "SET_TICKETS":
return {
...state,
tickets: action.payload,
};
default:
return state;
}
};

export default ticketsReducer;
В этом примере новые билеты добавляются в состояние newTickets, а затем постепенно отображаются на экране с помощью setTimeout. После 1 секунды новые билеты, которые соответствуют фильтрам, занимают свое место в списке.

Надеюсь, это помогает! Если у вас возникнут дополнительные вопросы, пожалуйста, дайте мне знать.
