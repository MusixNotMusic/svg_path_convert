// import * as d3 from "d3"
import _ from 'lodash'
import moment from 'moment'
const d3 = require('d3')
export default class Wind {
    width = 900
    height = 600
    margin = {top: 20, right: 30, bottom: 30, left: 20}
    allWidth = 0
    allHeight = 0
    testDataSize = 5000
    paths = [
        'M 4 2 Q 4 1.2 3.4 0.6 2.8 0 2 0 1.2 0 0.6 0.6 0 1.2 0 2 0 2.8 0.6 3.4 1.2 4 2 4 2.8 4 3.4 3.4 4 2.8 4 2 M 3.1 0.9 Q 3.6 1.3 3.6 2 3.6 2.7 3.1 3.1 2.6 3.6 2 3.6 1.3 3.6 0.8 3.1 0.4 2.7 0.4 2 0.4 1.3 0.8 0.9 1.3 0.4 2 0.4 2.6 0.4 3.1 0.9 Z',
        'M 5.3 0 L 3.7 0 3.7 30 5.3 30 5.3 0 Z',
        'M 2.1 0 L 2.1 30 3.7 30 3.7 1.6 6.9 1.6 6.9 0 2.1 0 Z',
        'M 0 30 L 1.6 30 1.6 1.6 9 1.6 9 0 0 0 0 30 Z',
        'M 9 0 L 0 0 0 30 1.6 30 1.6 5.2 4.8 5.2 4.8 3.6 1.6 3.6 1.6 1.6 9 1.6 9 0 Z',
        'M 9 -0.05 L 0 -0.05 0 30 1.6 30 1.6 5.15 9 5.15 9 3.55 1.6 3.55 1.6 1.55 9 1.55 9 -0.05 Z',
        'M 9 5.15 L 9 3.55 1.6 3.55 1.6 1.6 9 1.6 9 0 0 0 0 30 1.6 30 1.6 8.75 4.8 8.75 4.8 7.15 1.6 7.15 1.6 5.15 9 5.15 Z',
        'M 9 5.2 L 9 3.6 1.6 3.6 1.6 1.6 9 1.6 9 0 0 0 0 30 1.6 30 1.6 8.75 9 8.75 9 7.15 1.6 7.15 1.6 5.2 9 5.2 Z',
        'M 9 1.6 L 9 0 0 0 0 30 1.6 30 1.6 12.3 4.8 12.3 4.8 10.7 1.6 10.7 1.6 8.75 9 8.75 9 7.15 1.6 7.15 1.6 5.2 9 5.2 9 3.6 1.6 3.6 1.6 1.6 9 1.6 Z',
        'M 9 1.6 L 9 0 0 0 0 30 1.6 30 1.6 12.25 9 12.25 9 10.65 1.6 10.65 1.6 8.7 9 8.7 9 7.1 1.6 7.1 1.6 5.15 9 5.15 9 3.55 1.6 3.55 1.6 1.6 9 1.6 Z',
        'M 9 1.6 L 9 0 0 0 0 30 1.6 30 1.6 15.8 4.8 15.8 4.8 14.2 1.6 14.2 1.6 12.25 9 12.25 9 10.65 1.6 10.65 1.6 8.7 9 8.7 9 7.1 1.6 7.1 1.6 5.15 9 5.15 9 3.55 1.6 3.55 1.6 1.6 9 1.6 Z',
        'M 1.8 7.2 L 9 0 0 0 0 30.05 1.8 30.05 1.8 7.2 M 1.8 4.65 L 1.8 1.8 4.65 1.8 1.8 4.65 Z',
        'M 9 -0.05 L 0 -0.05 0 30 1.6 30 1.6 8.95 9 8.95 9 7.35 1.6 7.35 9 -0.05 M 1.8 1.75 L 4.65 1.75 1.8 4.6 1.8 1.75 Z',
        'M 9 -0.05 L 0 -0.05 0 30 1.6 30 1.6 12.15 9 12.15 9 10.55 1.6 10.55 1.6 8.95 9 8.95 9 7.35 1.6 7.35 9 -0.05 M 1.8 4.6 L 1.8 1.75 4.65 1.75 1.8 4.6 Z',
        'M 1.6 10.55 L 1.6 9 9 9 9 7.4 1.6 7.4 9 0 0 0 0 30 1.6 30 1.6 15.3 9 15.3 9 13.7 1.6 13.7 1.6 12.15 9 12.15 9 10.55 1.6 10.55 M 1.8 4.65 L 1.8 1.8 4.65 1.8 1.8 4.65 Z',
        'M 1.6 10.6 L 1.6 9 9 9 9 7.4 1.6 7.4 9 0 0 0 0 30 1.6 30 1.6 18.55 9 18.55 9 16.95 1.6 16.95 1.6 15.35 9 15.35 9 13.75 1.6 13.75 1.6 12.2 9 12.2 9 10.6 1.6 10.6 M 1.8 4.65 L 1.8 1.8 4.65 1.8 1.8 4.65 Z',
        'M 9 7.4 L 1.6 7.4 9 0 0 0 0 30 1.6 30 1.6 14.8 9 7.4 M 1.8 1.8 L 4.65 1.8 1.8 4.65 1.8 1.8 M 4.65 9.2 L 1.8 12.05 1.8 9.2 4.65 9.2 Z',
        'M 1.6 7.4 L 8.95 0 0 0 0 30 1.55 30 1.55 22.2 8.95 14.8 1.6 14.8 8.95 7.4 1.6 7.4 M 1.8 4.65 L 1.8 1.8 4.65 1.8 1.8 4.65 M 1.8 9.2 L 4.65 9.2 1.8 12.05 1.8 9.2 M 1.8 19.45 L 1.8 16.6 4.65 16.6 1.8 19.45 Z',
        'M 1.9 5 L 9 0 0 0 0 30.05 1.8 30.05 1.8 20.15 9 15.1 1.8 15.1 1.8 15.05 9 10 1.9 10 9 5 1.9 5 M 1.8 3.25 L 1.8 1.25 4.65 1.25 1.8 3.25 M 1.8 11.25 L 4.65 11.25 1.8 13.25 1.8 11.25 M 1.8 6.25 L 4.65 6.25 1.8 8.25 1.8 6.25 M 1.8 18.35 L 1.8 16.35 4.65 16.35 1.8 18.35 Z'
    ]
    x = null
    y = null
    ctx = null
    canvas = null
    timeFormat = d3.utcFormat("%H:%M")
    color = d3.interpolateHslLong("red", "blue")
    constructor(options = {}) {
        window.temp = this
        this.width  = options.width  || this.width
        this.height = options.height || this.height
        this.margin = options.margin || this.margin
        this.allWidth = this.width + this.margin.right + this.margin.left
        this.allHeight = this.height + this.margin.top + this.margin.bottom
        this.init()
    }

    init() {
        this.getTestData()
        this.createPanel()
        this.registerEvent()
        this.initX()
        this.initY()
        this.initScale()
        this.render()
    }

    createPanel() {
       this.canvas = document.createElement('canvas')
       this.canvas.width = this.width
       this.canvas.height = this.height
       this.ctx = this.canvas.getContext('2d')
       document.body.append(this.canvas)
    }

    registerEvent() {
        d3.select(this.canvas).call(
            d3.zoom()
              .scaleExtent([0.5, 4])
              .on("zoom", (event) => { 
                this.render(event.transform)
             })
        )
    }

    initX() {
      console.log('initX', d3.min(this.data, d => d.t), d3.max(this.data, d => d.t))
      this.x = d3
        .scaleLinear()
        .domain([d3.min(this.data, d => d.t), d3.max(this.data, d => d.t),])
        .range([this.margin.left, this.width - this.margin.right])
    }

    initY() {
      this.y = d3
        .scaleLinear()
        .domain([0, 5000])
        .nice()
        .range([this.height - this.margin.bottom, this.margin.top])
    }

    initScale() {
        this.sacle = 6000 / this.data.length > 0.8 ? 0.8: 6000 / this.data.length
    }

    getTestData() {
        this.data = new Array(this.testDataSize).fill(0).map((item, index) => {
            let yesterday = moment().subtract(1, 'day').valueOf()
            return {
                    t:    yesterday + (index / 46 | 0) * 1000 * 60 * 15, 
                    hei:  (index) % 46  * 100, 
                    vh:   Math.random() * 10 + 20, 
                    dir:  Math.random()* 60 + 100, 
                    vv:   Math.random() * 10 + 20,     
                    cn2:  1e-15 * (Math.random() * 100 | 0),
                    chop: 0.001 * (Math.random() * 100 | 0),
                    r   : Math.random() * 3 + 7
                  }
        })
    }

    drawWind(d, i) {
      let _x = this.x(d.t) + this.margin.left + 20
      let _y = this.y(d.hei) + this.margin.top
      let randPath =  this.paths[i % this.paths.length]
      let path = new Path2D(randPath)      
      this.ctx.fillStyle = this.color(i % 46 / 46)
    //   this.ctx.setTransform(this.scale, 0, 0, this.scale  , _x + d3.event.transform.x , _y + d3.event.transform.y)
      this.ctx.setTransform(this.scale, 0, 0, this.scale, _x, _y)
      this.ctx.rotate(d.dir / 180 * Math.PI)
      this.ctx.fill(path)
      this.ctx.resetTransform()
    }

    drawXAxis(transform) {
        let ctx = this.ctx
        let x = this.x
        if(transform) {
        //   this.rescaleX(x, transform)
        }
        var tickCount = 13,
            tickSize = 6,
            ticks = x.ticks(tickCount)
        var yOffset = this.height + this.margin.top - this.margin.bottom ;
        ctx.beginPath();
        ticks.forEach((d) => {
          ctx.moveTo(x(d) + this.margin.left, yOffset + 20);
          ctx.lineTo(x(d) + this.margin.left, yOffset + 20 + tickSize);
        });
        ctx.moveTo(this.margin.left + 20 , yOffset + 20);
        ctx.lineTo(this.width + this.margin.left, yOffset + 20);
        ctx.strokeStyle = "black";
        ctx.stroke();
      
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ticks.forEach((d) => {
          ctx.fillText(this.timeFormat(d), x(d) + this.margin.left , yOffset + 25 + tickSize);
        });
        ctx.stroke();
      }


    drawYAxis(transrorm) {
        let ctx = this.ctx
        let y = this.y
        var tickCount = 10,
            tickSize = 6,
            tickPadding = 3,
            ticks = y.ticks(tickCount),
            tickFormat = y.tickFormat(tickCount);
        var xOffset = this.margin.left + 20
        // ticks
        ctx.beginPath();
        ticks.forEach((d) => {
          ctx.moveTo(xOffset, y(d) + this.margin.top);
          ctx.lineTo(xOffset - 6, y(d) + this.margin.top);
        });
        ctx.moveTo(xOffset, this.margin.top);
        ctx.lineTo(xOffset, this.height + this.margin.top - 10);
        ctx.strokeStyle = "black";
        ctx.stroke();
        
        // text
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        ticks.forEach((d) => {
          ctx.fillText(tickFormat(d), xOffset - tickSize - tickPadding, y(d) + this.margin.top);
        });
      }

    render(transform) {
        this.ctx.clearRect(0, 0, this.allWidth, this.allHeight);
        this.ctx.beginPath();
        this.data.forEach(this.drawWind.bind(this))
        this.ctx.save();
        this.drawXAxis(transform)  
        this.drawYAxis(transform)
    }


    rescaleX(transform) {
        var range = this.x.range().map(transform.invertX, transform),
            domain = range.map(this.x.invert, this.x);
        return this.x.copy().domain(domain);
    }
}