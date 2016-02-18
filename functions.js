var sample_message = 'Выпьем за любовь родная.',
sample_container = "Пусть прошлое раскрошится \nВолною о причал, \nМы вспомним всё хорошее, \nЗабудем про печаль. \nУмчалась юность бедная \nЗа даль туманных звёзд, \nИ за любовь последнюю \nЯ поднимаю тост. \n\nВыпьем за любовь, \nКак блестят сейчас твои глаза, \nВыпьем за любовь, \nПусть дрожит хрустальная слеза. \nВыпьем за любовь, \nИ уже не надо лишних слов, \nВыпьем за любовь, родная, \nВыпьем за любовь. \n\nПpости меня за все цветы, \nЧто для других срывал, \nПpости меня за все мосты, \nЧто за собой сжигал. \nHо мы построили с тобой \nПоследний хрупкий мост, \nЗа возвращение любви \nЯ поднимаю тост. \n\nВыпьем за любовь, \nКак блестят сейчас твои глаза, \nВыпьем за любовь, \nПусть дрожит хрустальная слеза. \nВыпьем за любовь, \nИ уже не надо лишних слов, \nВыпьем за любовь, родная, \nВыпьем за любовь.\n\nВыпьем за любовь, \nКак блестят сейчас твои глаза, \nВыпьем за любовь, \nПусть дрожит хрустальная слеза. \nВыпьем за любовь, \nИ уже не надо лишних слов, \nВыпьем за любовь, родная, \nВыпьем за любовь.\n \nВыпьем за любовь, родная, \nВыпьем за любовь.\nВыпьем за любовь, родная, \nВыпьем за любовь.",
sample_colors = ['black', "red"];
sample_fontsizes = [12,16];

var alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

document.addEventListener('load', initialise, true);
var colors_flds,
	message_fld,
	container_fld,
	result_p,
	hide_btn,
	is_paint_chb,
	is_fontsize_chb,
	is_letters_chb,
	mode_rad,
	mode;

function initialise(){
	colors_flds = document.querySelectorAll('.num_color');
	is_paint_chb = document.getElementById('is_paint');
	is_paint_chb.onchange = isPaintActive;

	fontsize_flds = document.querySelectorAll('.num_fontsize');
	is_fontsize_chb = document.getElementById('is_fontsize');
	is_fontsize_chb.addEventListener('change', isFontsizeActive, true);

	mode_rad = document.getElementsByName('mode');
	for(var i = 0; i < mode_rad.length; i++)
		mode_rad[i].onchange = whatMode;
	mode = 'binary';
	
	message_fld = document.getElementById('message');
	container_fld = document.getElementById('container');
	result_p = document.getElementById('result');
	hide_btn = document.getElementById('hide_btn');
	
	//temporary
	colors_flds[0].value = sample_colors[0];
	colors_flds[1].value = sample_colors[1];
	fontsize_flds[0].value = sample_fontsizes[0];
	fontsize_flds[1].value = sample_fontsizes[1];
	container_fld.value = sample_container;
	message_fld.value = sample_message;
	//end tmp

	hide_btn.addEventListener('click', hide, true);

}

function checkColor(color){
	//TODO: check entered color value
	return true;
}

function checkLength(m, c){
	if(m.length > c.length)
		return false;
	return true;
}

function messageToBinary(m){
	return m.split('').map(function(s){
		return s.charCodeAt(0).toString(2);
	}).join('')
}

function isPaintActive(){
	document.getElementById('colors').disabled = !(this.checked);
}
function isFontsizeActive(){
	document.getElementById('fontsizes').disabled = !(this.checked);
}
function whatMode(){
	var color_labels = document.getElementById('colors').querySelectorAll('label.color_label');
	var fontsizes_labels = document.getElementById('fontsizes').querySelectorAll('label.fontsize_label');

	if(this.value === 'binary'){
		console.log('now binary');
		for(var i = 0; i < color_labels.length; i++){
			color_labels[i].innerText = 'Цвет ' + i;
			fontsizes_labels[i].innerText = 'Размер шрифта ' + i;
		}
	}
	else if(this.value === 'letter'){
		console.log('now letter');
		color_labels[0].innerText = 'Цвет символов контейнера';
		color_labels[1].innerText = 'Цвет символов сообщения';

		fontsizes_labels[0].innerText = 'Размер символов контейнера';
		fontsizes_labels[1].innerText = 'Размер символов сообщения';
	}

	mode = this.value;
}



function hide(){
	colors = [colors_flds[0].value, colors_flds[1].value];
	console.log(colors.join(', ')) 
	
	fontsizes = [fontsize_flds[0].value, fontsize_flds[1].value];
	console.log(fontsizes.join(', ')) 
	

	if(checkColor(colors[0]) && checkColor(colors[1])){
		var bin_m = messageToBinary(message_fld.value);
		if(bin_m.length > container_fld.value.length || message_fld.value.length > container_fld.value.length){
			result_p.innerText = 'Контейнер недостаточно велик.'
			return;
		}
		
		if(mode === 'binary'){
			var painted = new DocumentFragment();
			var i = 0,
				j = 0;
			while(i < bin_m.length){
				var span = document.createElement('span');
				span.innerText = container_fld.value[j];
				if(container_fld.value[j].match(/[а-я]/i)){
					if(is_paint_chb.checked){
						span.style.color = colors[Number(bin_m[i])];
					}
					if(is_fontsize_chb.checked){
						span.style.fontSize = fontsizes[Number(bin_m[i])];
					}
					i++;
				}
				j++;
				painted.appendChild(span);
			}
			result.innerText = '';
			result.appendChild(painted);
			span = document.createElement('span');
			if(is_fontsize_chb.checked){
				span.style.fontSize = fontsizes[0];
			}
			span.innerText = container_fld.value.slice(j);
			result.appendChild(span);
		}
		else if(mode === 'letter'){
			var painted = new DocumentFragment();
			var i = 0,
				j = 0;
			while(i < message_fld.value.length && j < container_fld.value.length){
				var span = document.createElement('span');
				span.innerText = container_fld.value[j];

				if(container_fld.value[j].toLowerCase() == message_fld.value[i].toLowerCase()){
					if(is_paint_chb.checked)
						span.style.color = colors[Number(is_paint_chb.checked)];

					if(is_fontsize_chb.checked)
						span.style.fontSize = fontsizes[Number(is_fontsize_chb.checked)];
					
					i++;
				}
				j++;
				painted.appendChild(span);
			}
			if(i < message_fld.value.length){
				result_p.innerText = 'Контейнер недостаточно велик.'
				return;
			}

			result.innerText = '';
			result.appendChild(painted);
			span = document.createElement('span');

			if(is_fontsize_chb.checked)
				span.style.fontSize = fontsizes[0];
			if(is_paint_chb.checked)
				span.style.color = colors[0];
			
			span.innerText = container_fld.value.slice(j);
			result.appendChild(span);
		}
		else
			result.innerText = 'How did you get here?';
	}
}
