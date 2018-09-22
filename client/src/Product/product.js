import React, { Component } from "react";
import { Button, Modal, Table, ModalHeader,Form, ModalBody, FormGroup,ModalFooter, Label, Input, Container } from "reactstrap";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from "uuid";
// import DropBox from "./Droppic.js";
import Dropzone from "react-dropzone";
import request from "superagent";
// import DropModal from "./modal";
import API from "../utils/API"
import  ListItem from "./../Components/Listitem";
import List from "./../Components/List";
import DeleteButton from "./../Components/DeleteButton";
import "./product.css";
import "../App.css";

//For Uploading Images
const CLOUDINARY_UPLOAD_PRESET = "ywtrj1y7";
const CLOUDINARY_UPLOAD_URL =
  " https://api.cloudinary.com/v1_1/dvp0y7ati/upload";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productArr: [],
      name: "",
      description: "",
      daily_Rent: Number,
      notes: "",
      //select option
      // select:"",
      item: Number,
      modal: false,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ""
    };
    this.toggle = this.toggle.bind(this);
  }
  
  
  //Anil's work
  // handleInputValue = event => {
  //   this.props.onChange({ [e.target.name]: e.target.value });
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };
  componentDidMount(){
    this.loadProducts();
  }
  
  loadProducts = () =>{
    API.getProducts()
      .then(res => this.setState({
          productArr: res.data,
          name:"",
          description:"",
          daily_Rent: Number,
          notes:"",
          // select:""
      }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const {name, value } = event.target;

    this.setState({
      [name]: value
    });
  };
  delete =(id) => {
    API.deleteProducts(id)
      .then(res => this.loadProducts())
      .catch(err => console.log(err))
    };
  

  //Toggle modal function
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  //This helps track the number of item on the database which also get rendered on modal
 addItem(){
   this.setState({
     item: this.state.item+1
   })
 }
  // Submit button click , save it to MongoDb Anil's mlab
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.toggle();
    API.saveProduct({    
        name: this.state.name,
        description: this.state.description,
        daily_Rent: this.state.daily_Rent,
        notes: this.state.notes,
        item: this.state.item
    })
    .then(res => console.log(this.productName, this.description,this.daily_Rent),this.loadProducts())
    .catch(err => console.log(err));
    
    //Anil's work
    // this.props.onChange({
    //   productName: "",
    //   Description: "",
    //   Daily_Rent: "",
    //   Note: ""
    // });
  };
  onImageDrop(files) {
    this.setState({ uploadedFile: files[0] });

    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({ uploadedFileCloudinaryUrl: response.body.secure_url });
      }
    });
  }
 // <a href="#" onClick={(event) => { func1(); func2();}}>Test Link</a>
  render() {
    return (
      <Container>
        <Form>
          <FormGroup>
            <Label for="product_Name">Product Name</Label>
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="Product Name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input  
              value={this.state.description}
              id="description"
              onChange={this.handleInputChange}
              name="description"
              placeholder="Product Description"
            />
          </FormGroup>

          <FormGroup>
            <Label for="rent_Id">Price per daily Rent</Label>
            <Input
              value={this.state.daily_Rent}
              onChange={this.handleInputChange}
              id="rent_Id"
              name="daily_Rent"
              placeholder= "Number Only!"             
            />
          </FormGroup>

          {/* <FormGroup>
            <Label for="exampleSelect">For Many days you want to rent</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup> */}
          <FormGroup>
            <Label for="exampleText">Notes About The Tool</Label>
            <Input
              value={this.state.notes}
              id="noteText"
              onChange={this.handleInputChange}
              name="notes" 
              type="text"      
            />
          </FormGroup>          
            {this.state.productArr.length ? (
              <List>
                {this.state.productArr.map(product => (
                  <ListItem key={product._id}>
                     {product.name} - ${product.daily_Rent}
                      <DeleteButton 
                        onClick={() => this.delete (product._id)}                     
                     />
                  </ListItem>
                ))}
              </List>
            
    ): (
     <h3>No results</h3>
  
    )}
    {/* // <a href="#" onClick={(event) => { func1(); func2();}}>Test Link</a> */}
          <Button className="btn" onClick={this.handleFormSubmit}>
            Submit
          </Button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          // className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Product info</ModalHeader>
              <ModalBody>
                  <Table>
                      <thead>
                        <tr>
                            <th>#</th>
                            <th className="productTitle">Product Name</th>                 
                            <th className="productDescription">Description</th>             
                            <th className="productRent">Daily_Rent</th>                 
                        </tr>
                      </thead>
                        {this.state.productArr.map(product =>    
                          <tr key={product._id}>
                            <th>{product.addItem}</th>
                            <th>{product.name}</th>
                            <th>{product.description}</th>
                            <th>${product.daily_Rent}</th>
                          </tr>
                        )}       
                      </Table>
              </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.toggle}>
              Add to View Product Page
            </Button>{" "} */}
            <Button color="primary" onClick={this.toggle}>
              Exit
            </Button>
          </ModalFooter>
        </Modal>
        <Container>
          <div>
            {/* If uploadFileCloudinaryUrl exsists in the state output the image you uploaded */}
            {/* Else upload a default image of your specification */}
            {this.state.uploadedFileCloudinaryUrl ? (
              <img height="50px" src={this.state.uploadedFileCloudinaryUrl} />
            ) : (
              <img height="50px" src="" />
            )}
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}
            >
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
          </div>
        </Container>
      </Container>
    );
  }
}

export default Products;
