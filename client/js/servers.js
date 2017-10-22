var servers = [{
		"name": "PI",
		"ip": "66.234.215.128",
		"port": "25567"
	},
	{
		"name": "PC",
		"ip": "66.234.215.128",
		"port": "27015"
	}
];

var serverSelect = document.getElementById("serverSelect");
for (i = 0; i < servers.length; i++) {
	var option = document.createElement('option');
	option.text = option.value = servers[i].name;
	serverSelect.add(option);
}
