var sample_message = 'Мой стих не поддается расшифровке.',
sample_container = "Без конца вздыхала Клава:\n— Если б я была кудрява,\nЯ б, как в сказке царь-девица,\nВсех затмила красотой.—\nИ решила ученица\nПоявиться завитой.\n\nЧерноброва и кудрява\nКрасна девица-душа!\nШепчут все: — Петрова Клава\nНевозможно хороша!\n\nНо сидит как неживая,\nБудто в сон погружена.\n— Ой,— сказала звеньевая,—\nКлава, кажется, больна!\n\nКлава молвила: — Подружки,\nЯ и вправду чуть жива!\nЯ металась на подушке:\nСпать мешали завитушки —\nВся в бумажках голова.\n\nТут она опять зевнула\nИ на алгебре заснула.\nСмотрит Анна Алексевна:\nВ классе — спящая царевна.\n\n— Ой,— волнуются подружки,\nЧетверть близится к концу,\nА у Клавы завитушки!\nНет, они ей не к лицу.",
sample_colors = ["rgb(0,0,0)", "red"];

var alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

document.addEventListener('load', initialise, true);
var colors_flds,
	message_fld,
	container_fld,
	result_p,
	hide_btn;

function initialise(){
	colors_flds = document.querySelectorAll('.num_color');
	message_fld = document.getElementById('message');
	container_fld = document.getElementById('container');
	result_p = document.getElementById('result');
	hide_btn = document.getElementById('hide_btn');

	//temporary
	colors_flds[0].value = sample_colors[0];
	colors_flds[1].value = sample_colors[1];
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


function hide(){
	colors = [colors_flds[0].value, colors_flds[1].value];
	console.log(colors.join(', ')) 
	
	if(checkColor(colors[0]) && checkColor(colors[1])){
		var bin_m = messageToBinary(message_fld.value);
		
		if(checkLength(bin_m, container_fld.value)){
			var painted = new DocumentFragment();
			var i = 0,
				j = 0;
			while(i < bin_m.length){
				var span = document.createElement('span');
				span.innerText = container_fld.value[j];
				if(container_fld.value[j].match(/[а-я]/i)){
					span.style.color = colors[Number(bin_m[i])];
					i++;
				}
				j++;
				painted.appendChild(span);
			}
			result.innerText = '';
			result.appendChild(painted);
			span = document.createElement('span');
			span.innerText = container_fld.value.slice(j);
			result.appendChild(span);
		}
		else{
			result.innerText = 'Контейнер недостаточно велик. Должен быть > ' + bin_m.length + ' символов';		
		}
	}

	//result.innerText = 'YOBA\nEto ty?';
}
