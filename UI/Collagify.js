var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

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
  rotate: function(direction){
    var theta = this.state.theta;
    if(direction === 'clockwise')
      theta += 2
    else {
      theta -= 2
    }
    this.setState({theta: theta})
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
            <span onTouchStart={this.rotate.bind(this, 'anti-clockwise')} onMouseDown={this.rotate.bind(this, 'anti-clockwise')}><i className="fa fa-undo" aria-hidden="true"></i></span>
            <span onClick={this.rotate.bind(this, 'clockwise')} onMouseDown={this.rotate.bind(this, 'clockwise')}><i className="fa fa-repeat" aria-hidden="true"></i></span>
          </span>
          <span className="resize" onTouchStart={this.startResize} onMouseDown={this.startResize}><i className="fa fa-circle" aria-hidden="true"></i></span>
          <span className="move" onTouchStart={this.startMove} onMouseDown={this.startMove}></span>
          <span className="updating"><i className="fa fa-cog fa-spin fa-3x fa-fw margin-bottom"></i></span>
        </div>
      </div>
    )
  }
})


var BorderrMenu = React.createClass({
  applyBorder: function(filter){
    this.props.setBorder(filter)
  },
  render: function(){
    return(
      <div className="submenu filters">
        <button className="menu-button frame" onClick={this.applyBorder.bind(this, 'frame')} />
        <button className="menu-button stars" onClick={this.applyBorder.bind(this, 'stars')} />
        <button className="menu-button vintage" onClick={this.applyBorder.bind(this, 'vintage')} />
        <button className="menu-button vibrant" onClick={this.applyBorder.bind(this, 'vibrant')} />
        <button className="menu-button painting" onClick={this.applyBorder.bind(this, 'painting')} />
      </div>
    )
  }
})

var FilterMenu = React.createClass({
  applyFilter: function(filter){
    this.props.setFilter(filter)
  },
  render: function(){
    return(
      <div className="submenu filters">
        <button className="menu-button greyscale" onClick={this.applyFilter.bind(this, 'greyscale')} />
        <button className="menu-button invert" onClick={this.applyFilter.bind(this, 'invert')} />
        <button className="menu-button sepea" onClick={this.applyFilter.bind(this, 'sepea')} />
        <button className="menu-button vibrant" onClick={this.applyFilter.bind(this, 'vibrant')} />
        <button className="menu-button posterize" onClick={this.applyFilter.bind(this, 'posterize')} />
      </div>
    )
  }
})

var BackgroundMenu = React.createClass({
  applyBackground: function(background){
    this.props.setBackground(background)
  },
  render: function(){
    return(
      <div className="submenu background">
        <button className="menu-button fabric" onClick={this.applyBackground.bind(this, 'fabric')} />
        <button className="menu-button heart" onClick={this.applyBackground.bind(this, 'heart')} />
        <button className="menu-button pink" onClick={this.applyBackground.bind(this, 'pink')} />
        <button className="menu-button plaid" onClick={this.applyBackground.bind(this, 'plaid')} />
        <button className="menu-button seventies" onClick={this.applyBackground.bind(this, 'seventies')} />
      </div>
    )
  }
})

var Menu = React.createClass({
  getInitialState: function(){
    return {filtersOpen: false, bordersOpen: false, backgroundOpen: false, background: 'transparent'}
  },
  addImage: function(){
    this.props.openUploader()
  },
  openFilters: function(){
    this.setState({filtersOpen: true, bordersOpen: false, backgroundOpen: false})
  },
  openBorders: function(){
    this.setState({bordersOpen: true, backgroundOpen: false, filtersOpen: false})
  },
  openBackgrounds: function(){
    this.setState({backgroundOpen: true, bordersOpen: false, filtersOpen: false})
  },
  closeBackgrounds: function(){
    this.setState({backgroundOpen: false})
  },
  setFilter: function(filter){
    this.props.setFilter(filter)
  },
  setBorder: function(border){
    this.props.setBorder(border)
  },
  setBackground: function(background){
    this.props.setBackground(background)
  },
  render: function(){
    var submenus = []
    if(this.state.backgroundOpen)
      submenus.push(<BackgroundMenu key={'backgroundmenu'} setBackground={this.setBackground} />)
    if(this.state.filtersOpen)
      submenus.push(<FilterMenu key={'filtermenu'} setFilter={this.setFilter} />)
    return(
      <div>
        <div className="main-menu">
          <div className="app-name">Collagify</div>
          <button className="menu-button upload-image" onClick={this.addImage} />
          <button className="menu-button filters" onClick={this.openFilters} />
          <button className="menu-button border" onClick={this.openBorders} />
          <button className="menu-button background" onClick={this.openBackgrounds} />
        </div>
        <ReactCSSTransitionGroup component="div" className="submenus" transitionName="submenu" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {submenus}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})


var ImageUploader = React.createClass({
  startDrag: function(e){
    e.preventDefault()
    e.stopPropagation()
    $('.uploader-form').addClass('dragover')
  },
  finishDrag: function(e){
    e.preventDefault()
    e.stopPropagation()
    $('.uploader-form').removeClass('dragover')
  },
  dropFile: function(e){
    e.preventDefault()
    e.stopPropagation()
    $('.uploader-form').removeClass('dragover')
    this.submitForm(e)
  },
  modalClick: function(e){
    if(e.target.className === 'upload-modal'){
      this.props.close()
    }
  },
  inputChange: function(e){
    this.submitForm(e)
  },
  submitForm: function(e){
    var ajaxData
    if(!e.dataTransfer){
      ajaxData = new FormData($('.uploader-form').get(0))
    }
    else if(e.dataTransfer.files) {
      ajaxData = new FormData()
      ajaxData.append('file', e.dataTransfer.files[0])
    }

    e.preventDefault()
    $.ajax({
      url: '/api/upload',
      method: 'POST',
      data: ajaxData,
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      complete: function() {
        $('.uploader-form').removeClass('uploading')
      }.bind(this),
      success: function(data) {
        $('.uploader-form').addClass('success')
        this.props.uploadComplete(true, data)
      }.bind(this),
      error: function() {
        $('.uploader-form').addClass('error')
        this.props.uploadComplete(false)
      }.bind(this)
    })
  },
  render: function(){
    return(
      <div className="upload-modal" onClick={this.modalClick}>
        <div className="uploader">
          <form onSubmit={this.submitForm} onDragOver={this.startDrag} onDragEnter={this.startDrag} onDragLeave={this.finishDrag} onDragEnd={this.finishDrag} onDrop={this.dropFile} className="uploader-form" encType="multipart/form-data">
            <div className="input-container">
              <input className="file-input" type="file" name="files" id="file" onChange={this.inputChange} />
              <label htmlFor="file">
                <i className="fa fa-upload" aria-hidden="true"></i>
                <strong>Choose a file</strong><span className="drag-n-drop"> or drag it here</span>.
              </label>
            </div>
            <div className="uploading">Uploading&hellip;</div>
            <div className="success">Done!</div>
            <div className="error">Error! <span></span>.</div>
          </form>
        </div>
      </div>
    )
  }
})


var Collagify = React.createClass({
  getInitialState: function(){
    return {background: 'none', currentSelection: undefined, uploaderOpen: false, images:[]};
  },
  makeActiveSelection: function(id){
    if(this.state.currentSelection)
      $('#' + this.state.currentSelection + ' .collage-image').removeClass('active')

    $('#' + id + ' .collage-image').addClass('active')
    this.setState({currentSelection: id})
  },
  openUploader: function(){
    this.setState({uploaderOpen:true})
  },
  closeUploader: function(){
    this.setState({uploaderOpen:false})
  },
  addImage: function(success, image){
    if(success){
      var images = this.state.images
      images.push(image)
      this.setState({images: images})
    }
    window.setTimeout(this.closeUploader,1500);
  },
  setCurrentSelection: function(){
    this.setState({currentSelection: undefined})
  },
  setBackground: function(background){
    this.setState({background:'url(/background/' + background + '-background.jpg)'})
  },
  setBorder: function(){

  },
  setFilter: function(filter){
    var ajaxData = {token: 1234}
    if(this.state.currentSelection ){
      $('#' + this.state.currentSelection + ' .updating').show()
      $.ajax({
        url: '/api/apply-filter/' + this.state.currentSelection + '/' + filter,
        method: 'POST',
        data: ajaxData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        complete: function() {
          $('#' + this.state.currentSelection + ' .updating').hide()
        }.bind(this),
        success: function(data) {
          var id = data.split('+')[0]
          var images = this.state.images
          var i = 0
          for(var image of images){
            if(image.id === id)
              break
            i++
          }
          images[i].src = data
          this.setState({images: images})
        }.bind(this),
        error: function() {
          console.log("error")
        }.bind(this)
      })
    }
  },
  render: function(){
    var uploader = this.state.uploaderOpen ? <ImageUploader key={"uploadmodal"} close={this.closeUploader} uploadComplete={this.addImage}/> : undefined
    var images = []
    for(var image of this.state.images){
      images.push(<Image key={image.id} id={image.id} height={image.dims.height} width={image.dims.width} imageSrc={image.src} makeActiveSelection={this.makeActiveSelection}/>)
    }
    var style = {
      background: this.state.background
    }
    return(
      <div className="collagify">
        <Menu setBackground={this.setBackground} setFilter={this.setFilter} openUploader={this.openUploader} setBorder={this.setBorder} />
        <div style={style} className="collage-canvas">
          {images}
        </div>
        <ReactCSSTransitionGroup transitionName="modal" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {uploader}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})

ReactDOM.render(<Collagify />, document.getElementById('Collagify'))
