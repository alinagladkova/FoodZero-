$('.wrapper').addClass('loaded');

//IBG JS
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();


//Отправка формы
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault(); // запрещаем стандартную отправку формы

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			//если отправка займет время, то по этому классу можно вставить изображение ожидания
			/*form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Error");
				form.classList.remove('_sending');
			}*/
		} else {
			alert('You need to fill information');
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);
			//Проверяем ввод email
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});


//Scroll
let cords = ['scrollX', 'scrollY'];
// сохраняем позицию скролла в localStorage
window.addEventListener('unload', e => cords.forEach(cord => localStorage[cord] = window[cord]));
// вешаем событие на загрузку (ресурсов) страницы
window.addEventListener('load', e => {
	// если в localStorage имеются данные
	if (localStorage[cords[0]]) {
		// скроллим к сохраненным координатам
		window.scroll(...cords.map(cord => localStorage[cord]));
		// удаляем данные с localStorage
		cords.forEach(cord => localStorage.removeItem(cord));
	}
});

document.querySelectorAll('.__button').forEach(el => {
	el.addEventListener('click', () => {
		cords.forEach(cord => localStorage[cord] = window[cord]);
	});
});