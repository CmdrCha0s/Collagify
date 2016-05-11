var Image = React.createClass({
  getInitialState: function(){
    return {posX: 167, posY: 336, theta: 0, height: 0 , width: 0, filter: undefined, mouseX: 0, mouseY:0, rotXStart:0, rotYStart:0, mouseDown: false, action: undefined}
  },
  componentDidMount: function(){
    this.setState({height: this.props.height, width: this.props.width})
  },
  calculateMouseDelta: function(e){
    if(this.state.mouseDown){
      var clientX = e.touches ? e.touches[0].clientX : e.clientX
      var clientY = e.touches ? e.touches[0].clientY : e.clientY
      var delX = this.state.mouseX ? clientX - this.state.mouseX : 0
      var delY = this.state.mouseY ? clientY - this.state.mouseY : 0
      switch(this.state.action){
          case 'move' :
            var x = this.state.posX + delX
            var y = this.state.posY + delY
            this.setState({posX: x, posY: y, mouseX: clientX, mouseY: clientY})
            break
          case 'resize' :
            var scale = Math.sqrt(delX*delX + delY*delY) / 100
            var enlarge = delX < 0 || delY < 0
            var x = this.state.posX + delX
            var y = this.state.posY + delY
            var h = enlarge ? this.state.height + this.state.height * scale : this.state.height - this.state.height * scale
            var w = enlarge ? this.state.width + this.state.width * scale : this.state.width - this.state.width * scale
            this.setState({posX: x, posY: y, height: h, width: w, mouseX: clientX, mouseY: clientY})
            break
          case 'rotate-clockwise' :
            var theta = this.state.theta;
            if(((theta > 270 || theta <= 90) && delX > 0) || (theta <= 270 && theta > 90 && delX < 0)){
                console.log('rotate')
              theta += 1
              if(theta < 0)
                theta = 360 - theta;
              theta = theta % 360
            }
            this.setState({theta: theta, mouseX: clientX, mouseY: clientY})
            break
          case 'rotate-anticlockwise' :
            var theta = this.state.theta;
            if(((theta > 270 || theta <= 90) && delX < 0) || (theta <= 270 && theta > 90 && delX > 0)){
              theta -= 1
              console.log(theta)
              if(theta < 0)
                theta = (360 + theta) % 360;
              console.log(theta)
            }
            this.setState({theta: theta, mouseX: clientX, mouseY: clientY})
            break
          default:
            break
      }
    }
  },
  mouseDown: function(e){
    e.preventDefault()
    this.props.makeActiveSelection(this.props.id)
    this.setState({mouseDown: true})
  },
  mouseUp: function(e){
    e.preventDefault()
    this.setState({mouseDown: false, action: undefined, mouseX: undefined, mouseY: undefined})
  },
  startRotateClockwise: function(){
    this.setState({action: 'rotate-clockwise', mouseDown: true})
  },
  startRotateAntiClockwise: function(){
    this.setState({action: 'rotate-anticlockwise', mouseDown: true})
  },
  startResize: function(){
    this.setState({action:'resize', mouseDown: true})
  },
  startMove: function(){
    this.setState({action:'move', mouseDown: true})
  },
  render: function(){
    var imageStyle = {
      background: 'url(' + this.props.imageSrc + ')',
      top: this.state.posY,
      left: this.state.posX,
      height: this.state.height + 'px',
      width: this.state.width + 'px',
      transform: 'rotate(' + this.state.theta + 'deg)'
    }

    return(
      <div className="image-wrapper" id={this.props.id} onTouchMove={this.calculateMouseDelta} onMouseMove={this.calculateMouseDelta} onTouchEnd={this.mouseUp} onMouseUp={this.mouseUp}>
        <div className="collage-image" onTouchStart={this.mouseDown} onMouseDown={this.mouseDown} style={imageStyle}>
          <span className="rotate">
            <span onTouchStart={this.startRotateAntiClockwise} onMouseDown={this.startRotateAntiClockwise}><i className="fa fa-undo" aria-hidden="true"></i></span>
            <span onTouchStart={this.startRotateClockwise} onMouseDown={this.startRotateClockwise}><i className="fa fa-repeat" aria-hidden="true"></i></span>
          </span>
          <span className="resize" onTouchStart={this.startResize} onMouseDown={this.startResize}><i className="fa fa-expand" aria-hidden="true"></i></span>
          <span className="move" onTouchStart={this.startMove} onMouseDown={this.startMove}></span>
          <span className="updating"><i className="fa fa-cog fa-spin fa-3x fa-fw margin-bottom"></i></span>
        </div>
      </div>
    )
  }
})
