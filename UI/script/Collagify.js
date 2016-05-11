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
