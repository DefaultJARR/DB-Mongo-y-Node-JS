/*

{
"langs": [
"JS"
],
"_id": "5d83ddc6a89f701f6ca048b4",
"name": "Comi Domi Updated 4",
"description": "Empresa de Comida ",
"category": "Web Develop",
"year": 2011,
"image": "tfVc8t9wCW1xGcpZNDPvwhWO.png",
"__v": 0
},

*/


export class Project {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public category: string,
        public year: number,
        public langs: string,
        public image: string
    ) { }
}