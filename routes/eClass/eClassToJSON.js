// eClassToJSON.js


var eClassToJSON = (function() {


	this.convert = function(text) {
		/*
		return { subnode: [ 
					{ a:'abc' },
					{ a: 'second'},
					{ a: 'third'}
					] };
*/

return {
  id: 0,
  parentId: 0,
  ftid: "ROOT",
  ftname: "ROOT",
  subnode: [
    {
      ftid: "BAH005",
      ftname: "Bemessungsspannung",
      fvalues: [
        "800"
      ],
      "funit": "VLT"
    },
    {
      ftid: "AAP403",
      ftname: "Anzahl der Klemmstellen je Etage",
      fvalues: [
        "2"
      ]
    },
    {
      ftid: "AAP530",
      ftname: "Anzahl der Etagen",
      fvalues: [
        "1"
      ]
    },
    {
      ftid: "BAC137",
      ftname: "Breite des Rastermaßes",
      fvalues: [
        "5.1"
      ],
      "funit": "MMT"
    },
    {
      ftid: "BAC476",
      ftname: "Höhe (bei niedrigbauender Montageart)",
      fvalues: [
        "47"
      ],
      "funit": "MMT"
    },
    {
      ftid: "BAD123",
      ftname: "Etagen intern gebrückt",
      "valueIdRef": "CAA017",
      "fvalueDetails": "Nein"
    },
    {
      ftid: "BAD774",
      ftname: "Abschlussplatte erforderlich",
      "valueIdRef": "CAA016",
      "fvalueDetails": "Ja"
    },
    {
      ftid: "AAR080",
      ftname: "Mechanische und elektrische Konstruktion (s)",
      "valueIdRef": "ADS444",
      "fvalueDetails": "Mechanische und elektrische Konstruktion (s)"
    },
    {
      ftid: "AAB500",
      ftname: "Bemessungsstrom",
      fvalues: [
        "32"
      ],
      "funit": "AMP"
    },
    {
      ftid: "BAC677",
      ftname: "max. anschließbarer Leiterquerschnitt (eindrähtig)",
      fvalues: [
        "4"
      ],
      "funit": "MMK"
    },
    {
      ftid: "AAB787",
      ftname: "max. anschließbarer Leiterquerschnitt (feindrähtig mit Aderendhülse)",
      fvalues: [
        "2.5"
      ],
      "funit": "MMK"
    },
    {
      ftid: "BAC676",
      ftname: "max. anschließbarer Leiterquerschnitt (feindrähtig ohne Aderendhülse)",
      fvalues: [
        "4"
      ],
      "funit": "MMK"
    },
    {
      ftid: "AAB789",
      ftname: "max. anschließbarer Leiterquerschnitt (mehrdrähtig)",
      fvalues: [
        "4"
      ],
      "funit": "MMK"
    },
    {
      ftid: "BAC740",
      ftname: "min. anschließbarer Leiterquerschnitt (eindrähtig)",
      fvalues: [
        "0.14"
      ],
      "funit": "MMK"
    },
    {
      ftid: "AAB937",
      ftname: "min. anschließbarer Leiterquerschnitt (feindrähtig mit Aderendhülse)",
      fvalues: [
        "0.14"
      ],
      "funit": "MMK"
    },
    {
      ftid: "BAC739",
      ftname: "min. anschließbarer Leiterquerschnitt (feindrähtig ohne Aderendhülse)",
      fvalues: [
        "0.14"
      ],
      "funit": "MMK"
    },
    {
      ftid: "AAB940",
      ftname: "min. anschließbarer Leiterquerschnitt (mehrdrähtig)",
      fvalues: [
        "0.14"
      ],
      "funit": "MMK"
    },
    {
      ftid: "BAA018",
      ftname: "Länge",
      fvalues: [
        "60"
      ],
      "funit": "MMT"
    },
    {
      ftid: "BAA351",
      ftname: "Farbe",
      "valueIdRef": "BAA242",
      "fvalueDetails": "beige"
    },
    {
      ftid: "BAC034",
      ftname: "Ausführung des elektrischen Anschlusses (1)",
      "valueIdRef": "WAA065",
      "fvalueDetails": "Schraubanschluss"
    },
    {
      ftid: "BAC140",
      ftname: "Brennbarkeitsklasse des Isolierstoffes (in Anlehnung an UL 94)",
      "valueIdRef": "BAB110",
      "fvalueDetails": "V0"
    },
    {
      ftid: "BAC375",
      ftname: "Ausführung des elektrischen Anschlusses (2)",
      "valueIdRef": "WAA065",
      "fvalueDetails": "Schraubanschluss"
    },
    {
      ftid: "BAC487",
      ftname: "Werkstoff des Isolierkörpers",
      fvalues: [
        "Wemid"
      ]
    }
    ]
};


	}

	return {
		convert: convert
	}
})();


module.exports = eClassToJSON