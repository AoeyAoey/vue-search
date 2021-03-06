define({ "api": [
  {
    "type": "get",
    "url": "/users",
    "title": "Request User information",
    "name": "GetUsers",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "INT",
            "optional": false,
            "field": "id",
            "description": "<p>id of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "VARCHAR",
            "optional": false,
            "field": "first_name",
            "description": "<p>first_name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "VARCHAR",
            "optional": false,
            "field": "last_name",
            "description": "<p>last_name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "VARCHAR",
            "optional": false,
            "field": "email",
            "description": "<p>email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "VARCHAR",
            "optional": false,
            "field": "gender",
            "description": "<p>gender of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "INT",
            "optional": false,
            "field": "age",
            "description": "<p>age of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n    \"first_name\": \"trish\",\n    \"last_name\": \"potebury\",\n    \"email\": \"tpotebury0@artisteer.com\",\n    \"gender\": \"female\",\n    \"age\": 19\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "service/service1.js",
    "groupTitle": "Users"
  }
] });
