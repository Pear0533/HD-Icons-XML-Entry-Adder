const fs = require('fs');
const XML_NAME = '_yabber-bxf4';
const NUM_TO_ADD = process.argv[2];
const ID = parseInt(process.argv[3]);
let xml = fs.readFileSync(`./${XML_NAME}.xml`);

function insert(str, index, value) {
	return str.substr(0, index) + value + str.substr(index);
}

for (let i = 1; i <= NUM_TO_ADD; ++i) {
	const dummyEntryLoc = xml.lastIndexOf(`${ID + i - 1}`);
	const dummyIdIndex = xml.lastIndexOf('<id>', dummyEntryLoc);
	const dummyEntryId = parseInt(xml.slice(dummyIdIndex + 4, dummyIdIndex + 8));
	const insertLoc = xml.indexOf('</file>', dummyEntryLoc) + 7;
	const newEntryStr =
	`${i > 1 ? '\n    ' : '    '}<file>
      <flags>0x40</flags>
      <id>${dummyEntryId + 1}</id>
      <root />
      <path>00_Solo\\MENU_Knowledge_${ID + i}.tpf.dcx</path>
    </file>${i == NUM_TO_ADD ? '\n' : ''}`;
	xml = insert(xml.toString(), insertLoc, newEntryStr);
}

fs.writeFileSync(`./${XML_NAME}_o.xml`, xml);