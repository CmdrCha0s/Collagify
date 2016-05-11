var BorderMenu = React.createClass({
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
    var submenu
    if(this.state.backgroundOpen)
      submenu = <BackgroundMenu key={'backgroundmenu'} setBackground={this.setBackground} />
    if(this.state.filtersOpen)
      submenu = <FilterMenu key={'filtermenu'} setFilter={this.setFilter} />
    if(this.state.bordersOpen)
      submenu = <BorderMenu key={'bordermenu'} setBorder={this.setBorder} />
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
          {submenu}
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
