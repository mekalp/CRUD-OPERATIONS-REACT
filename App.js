import React, { Fragment } from "react"
import axios from "axios"



const API= "https://jsonplaceholder.typicode.com/posts"
const URL= "https://jsonplaceholder.typicode.com/comments"

export default class App extends React.Component{

      constructor(){
      
        super()
        this.state={
           
          posts:[],
          userId:"",
          title:"",
          body:"",
          id:"",
          comments:[],
          



        }


      }


    componentDidMount(){


    this.getPosts()


      }


      ////Read operations////


      getPosts= async ()=>{

      const {data} = await axios.get(API)

      console.log(data)

      this.setState({posts:data})

      }



      ///Delete Operations///


      handleDelete= async (pid)=>{


        const {data}= await axios.delete(`${API}/${pid}`)
        console.log(data)

        const mekala=[...this.state.posts]
      
        let mt= mekala.filter( pt => pt.id !== pid )

        console.log(mt)

        this.setState({posts:mt})
        
      }


      ///Create-Operations////

      
       createPosts= async ()=>{


        const {data}= await axios.post(API,{

                 userId:this.state.userId,
                 title:this.state.title,
                 body:this.state.body,
 
        })

            console.log(data)
        
            const mekalas=[...this.state.posts]

            mekalas.push(data);


            this.setState({posts:mekalas,userId:"",title:"",body:""})


       }







      handleSubmit=(e)=>{

        e.preventDefault()
       console.log(this.state)


       if(this.state.id){
       
        this.updatePosts()

       }else{

        this.createPosts()

       }

      }


      handleChange=({target:{name,value}})=>{

        console.log(name,value)

        this.setState({[name]:value})

      }


//////Update posts//////

  selectPosts=(pt)=>{

    this.setState({id:pt.id,userId:pt.userId, title:pt.title, body:pt.body})

  }



  updatePosts=async ()=>{

     const {data}= await axios.put(`${API}/${this.state.id}`,{

      userId:this.state.userId,
      title:this.state.title,
      body:this.state.body,

     })

     console.log(data)

     const matthew=[...this.state.posts]
     const postIndex=matthew.findIndex(ptt=>ptt.id===this.state.id)
     matthew[postIndex]=data

     this.setState({posts:matthew,userId:"",title:"",body:"",id:""})


  }


  /////GET- All COMMENTS will be stored in comments key////


    assignComments=async()=>{

      const {data}= await axios.get(URL)

      console.log(data)

      this.setState({comments:data})
  

    }



    /////About getting comments based upon the post id we pass////

      getComments= async (pid)=>{


        this.assignComments()

        const {data}= await axios.get(`${URL}?${pid}`)

        console.log(data)

        let mekalap=[...this.state.comments]

         mekalap=mekalap.filter((ele)=>ele.postId===pid)

         this.setState({comments:mekalap})

         
      }
     



      render(){

       return(
       
       <Fragment>
       
      <form onSubmit={this.handleSubmit} class="frm">
       
       <h4>Form to enter details in the table</h4>
       <div>
      <label>userId: </label>
      <input type="text" name="userId" value={this.state.userId} onChange={this.handleChange}></input>
      </div>
      <br/>

      <div>

       <label>title: </label>
       <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>

      </div>
      <br/>
      <div>

       <label>body: </label>
       <input type="text" name="body" value={this.state.body} onChange={this.handleChange}></input>

      </div>
      <br/>
      <div>

       <button type="submit">SUBMIT</button>

      </div>

      </form>


       <table class="table">
        <thead>
          <tr>

         <td>id</td>
         <td>userId</td>
         <td>title</td>
         <td>body</td>
         <td>Action</td>

        </tr>

        </thead>    

        <tbody>
          
          {this.state.posts.map((pst)=>{

            return (


              <tr key={pst.id} class="tr">
                
                <td class="tr">{pst.id}</td>
                <td class="tr">{pst.userId}</td>
                <td class="tr">{pst.title}</td>
                <td class="tr">{pst.body}</td>
                <td class="tr">
                <button onClick={()=>{this.selectPosts(pst)}}>EDIT</button>
                <button onClick={()=>{this.handleDelete(pst.id)}}>DELETE</button>
                <button onClick={()=>{this.getComments(pst.id)}}>COMMENTS</button>
                </td>
              </tr>
              
            )
               



          })
            
          }          

          </tbody>   
          </table>



          <table>

        <thead>
 
        <tr class="lot">

        <td class="lot">postId</td>
        <td class="lot">id</td>
        <td class="lot">name</td>
        <td class="lot">email</td>
        <td class="lot">body</td>

        </tr>

        </thead>

        <tbody>
        
        {this.state.comments.map((P)=>{

           return (

           <>

        <tr key={P.id} class="lot">   

        <td class="lot">{P.postId}</td>
        <td class="lot">{P.id}</td>
        <td class="lot">{P.name}</td>
        <td class="lot">{P.email}</td>
        <td class="lot">{P.body}</td>

        </tr>

           </>

           )




        })
        
        
        
        
        
        } 

        </tbody>




          </table>

       </Fragment>
       
       )


      }


}