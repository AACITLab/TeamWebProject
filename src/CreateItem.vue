<template>
	<div>
		
			<div class="row">
				<div class="col-md-6">
					<h1>Ajouter un médicament</h1>
					 <form v-on:submit.prevent="addItem">
					 	<div class="form-group">
							<label>Médicament</label>
							<input type="text"  class="form-control" v-model="item.masp"/>
						</div>
						<div class="form-group">
							<label>Posologie (mg/ml)</label>
							<input type="text"  class="form-control" v-model="item.name"/>
						</div>
						<div class="form-group">
							<label>Date de Péremption DPP</label>
							<input type="text" class="form-control col-md-6" v-model="item.price">		

						</div>
						<div class="form-group">
							<label>Image:</label>
							<input @change="uploadImage" type="file" name="image" accept="image/*">	
						    <img :src="imageSrc" class="image">
						</div>
						<div class="form-group">
				          <button class="btn btn-primary">Ajouter</button>
				        </div>
				    </form>
				      <button class="btn btn-success" v-on:click="updateItem">Mettre à jour</button>
				</div>
				<div class="col-md-6">
					
							<h1>Armoire à Pharmacie</h1>
							<table class="table">
								<thead>
									<tr>
										<th>Libellé</th>
										<th>Posologie (mg/ml)</th>
										<th>DPP</th>
										<th>Image</th>
										<th>Modifier</th>
										<th>Supprimer</th>
									</tr>
		
								</thead>
								<tbody>
										<tr v-for="(sp,index) in dulieu[0]" v-if="sp !== null" >
											<td>{{sp.masp}}</td>
											<td>{{sp.name}}</td>
											<td>{{sp.price}}</td>
											<td><img :src="sp.image" class="class_img" /></td>
											<td><span class="badge badge-info" v-on:click="editItem(index)">Edit</span></td>
											<td><span class="badge badge-danger" v-on:click="deleteItem(index)">Delete</span></td>
										</tr>
								</tbody>
							</table>
				</div>
			</div>
	</div>

</template>
<style>
	.image{
		width:150px;
		height: 150px;
	}
	.class_img{
		width:80px;
		height: 100px;
	}
</style>
<script>
	export default{
		data(){
			return {
				item:{},
				dulieu:[],
				imageSrc: 'https://www.logolynx.com/images/logolynx/97/9781fd9c436d7323a93c48f03f51d7af.png',
			}
		},
		created:function(){
			this.getItems();
		},
		methods:{
			addItem(){
				this.axios.post("/add",this.item).then((response) => {
					   console.log(response);
					   this.dulieu[0].push({
						   "masp":this.item.masp,
						   "name":this.item.name,
						   "price":this.item.price,
						   "image":"uploads/"+this.item.image
					   })
				  });
				  
			},
			editItem(index){
				//console.log(this.dulieu[0][index]);
				const data_edit = this.dulieu[0][index];
				this.item=data_edit;
				this.imageSrc = this.item.image;
			},
			updateItem(){
				
				this.axios.post("/update",this.item).then((response) => {
					const image = this.item.image.replace('uploads/', '');
					console.log(image);
					const index = response.data['vitri'];
					this.dulieu[0][index].masp=this.item.masp;
					this.dulieu[0][index].name=this.item.name;
					this.dulieu[0][index].price=this.item.price;
					this.dulieu[0][index].image="uploads/"+image;
					
					this.item={};
					// console.log(this.dulieu[0][index].image="uploads/"+this.item.image);
					 console.log(this.dulieu[0]);
					
             	 });
			},
			deleteItem(index){
				
				const masp = this.dulieu[0][index].masp;
				console.log(masp);
				this.axios.get("/delete/"+masp).then((response)=>{
					console.log(response.data);
					this.dulieu[0].splice(index, 1);
				});
			},
			getItems(){
				
				this.axios.get("/getItems").then((response) => {
					this.dulieu.push(response.data); 
					console.log(this.dulieu);
             	});
			},
			uploadImage: function(e) {
			      const files = e.target.files;
			      this.item.image = files[0].name;
			    
			      if(!files[0]) {
			        return;
			      }
			     const data = new FormData();
				  data.append('image', files[0]);
				      const reader = new FileReader();
				      reader.onload = (e) => {
				        this.imageSrc = e.target.result;
				      };
				      this.axios.post('/uploads', data, {headers: { 'Content-Type': 'multipart/form-data' } }).then(function (response) {
						reader.readAsDataURL(files[0]);
				      }).catch(function (error) {
				        console.log(error) // catch your error
				      });
			      reader.readAsDataURL(files[0]);
			}
		}
	}

</script>
