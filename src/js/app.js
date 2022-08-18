import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';


document.addEventListener('DOMContentLoaded', () => {

	initApp();
	const form = formUI.form;

	//Events
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		onFormSubmit();

	});

	//Hendlers
	async function initApp() {
		await locations.init();
		formUI.setAutoCompleteDate(locations.shortCitiesList);
	}

	async function onFormSubmit() {
		//cобрать данные из инпутов
		const origin = locations.getCityCodeByKey(formUI.orginValue);
		const destination = locations.getCityCodeByKey(formUI.destinationValue);
		const depart_date = formUI.departDateValue;
		const return_date = formUI.returnDateValue;
		const currency = currencyUI.currecyValue;
		// CODE, CODE, 2019-09, 2019-10
		console.log(origin, destination, depart_date, return_date);
		await locations.fetchTickets({
			origin,
			destination,
			depart_date,
			return_date,
			currency,
		});

		ticketsUI.renderTickets(locations.lastSearch);
	}
});