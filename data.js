var raw = {
  "time": "dtmc",
  "alphabet": [
    "a",
    "b",
    "c"
  ],
  "constants": [],
  "variables": [],
  "automata": [
    {
      "name": "automaton1",
      "variables": [],
      "locations": [
        {
          "name": "s1",
          "invariant": "invariant1"
        },
        {
          "name": "s5",
          "invariant": "invariant5"
        },
        {
          "name": "s6",
          "invariant": "invariant6"
        },
        {
          "name": "s2",
          "invariant": "invariant2"
        },
        {
          "name": "s3",
          "invariant": "invariant3"
        },
        {
          "name": "s4",
          "invariant": "invariant4"
        }
      ],
      "edges": [
        {
          "location": "s1",
          "label": "a",
          "rate": "",
          "guard": "",
          "destinations": [
            {
              "probability": "0.9",
              "location": "s3",
              "assignments": []
            },
            {
              "probability": "0.1",
              "location": "s1",
              "assignments": []
            }
          ]
        },
        {
          "location": "s2",
          "label": "c",
          "rate": "",
          "guard": "",
          "destinations": [
            {
              "probability": "0.5",
              "location": "s4",
              "assignments": []
            },
            {
              "probability": "0.5",
              "location": "s6",
              "assignments": []
            }
          ]
        },
        {
          "location": "s1",
          "label": "b",
          "rate": "",
          "guard": "",
          "destinations": [
            {
              "probability": "1",
              "location": "s2",
              "assignments": []
            }
          ]
        },
        {
          "location": "s6",
          "label": "a",
          "rate": "",
          "guard": "",
          "destinations": [
            {
              "probability": "1",
              "location": "s5",
              "assignments": []
            }
          ]
        },
        {
          "location": "s4",
          "label": "b",
          "rate": "",
          "guard": "",
          "destinations": [
            {
              "probability": "1",
              "location": "s5",
              "assignments": []
            }
          ]
        },
        {
          "location": "s5",
          "label": "a",
          "rate": "",
          "guard": "",
          "destinations": [
            {
              "probability": "1",
              "location": "s3",
              "assignments": []
            }
          ]
        }
      ]
    },
    {
      "name": "automaton2",
      "variables": [],
      "locations": [
        {
          "name": "t1",
          "invariant": ""
        },
        {
          "name": "t2",
          "invariant": "invariant"
        },
        {
          "name": "t3",
          "invariant": ""
        }
      ],
      "edges": [
        {
          "location": "t1",
          "label": "a",
          "rate": "",
          "guard": "",
          "destinations": [
            {
              "probability": "0.4",
              "location": "t3",
              "assignments": []
            },
            {
              "probability": "0.6",
              "location": "t2",
              "assignments": []
            }
          ]
        },
        {
          "location": "t2",
          "label": "b",
          "rate": "",
          "guard": "",
          "destinations": [
            {
              "probability": "1",
              "location": "t3",
              "assignments": []
            }
          ]
        }
      ]
    }
  ],
  "system": ""
};
