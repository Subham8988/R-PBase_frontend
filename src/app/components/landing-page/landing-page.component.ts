import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserActionService } from 'src/app/services/user-action.service';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(private toastrService: ToastrService,private service:UserActionService) { }

  test : Date = new Date();
  userListArray:any;
  roleListArray:any;
  permissionListArray:any;
  p:number=1;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  userData!:FormGroup;
  roleData!:FormGroup;
  permissonData!:FormGroup;

 ngOnInit(): void{

  this.userData = new FormGroup({
    name : new FormControl(''),
    email: new FormControl(''),
    mobile_no: new FormControl('',Validators.pattern("^((?!(0))[0-9]{10})?(?:,((?!(0))[0-9]{10}))*$")),
    Status:new FormControl('true')
  });
  this.roleData = new FormGroup({
    role_Name: new FormControl(''),
    role_Status: new FormControl('true')
  });
  this.permissonData =new FormGroup({
    permission_Name: new FormControl(''),
    permission_Status: new FormControl('true')
  })

  this.userlists();
  this.roleLists();
  this.permissonslist();



}

onItemSelect(item: any) {
  console.log(item);
}
onSelectAll(items: any) {
  console.log(items);
}


  //getter seeter
  get mobile_no(){
    return this.userData.get('mobile_no');
 }



  // use list
  async userlists()
  {
    let res = await this.service.allUserList();
    if(res.status==200)
    {
      this.userListArray=res.result;
    }
    else{this.toastrService.error('Message please enter email!', ' Error!');}
  }

  //role lists
  async roleLists()
  {
    let res = await this.service.roleList();
    if(res.status==200)
    {
      this.roleListArray=res.result;
    }
    else{this.toastrService.error('Message!', res.msg);}

  }

  //permission list
  async permissonslist()
  {
    let res = await this.service.permissionList();
    if(res.status==200)
    {
      this.permissionListArray=res.data;
    }
    else{this.toastrService.error('Message!', res.msg);}
  }

  //create user
  async createUser()
  {
    const payload = this.userData.value;
    if(payload['name']!=''&&payload['name']!=null&&payload['name']!=undefined)
    {
      if(payload['mobile_no']!=''&&payload['mobile_no']!=null&&payload['mobile_no']!=undefined)
      {
        if(payload['email']!=''&&payload['email']!=null&&payload['email']!=undefined)
        {
         let res = await this.service.createUser(payload);
         if(res.status==201)
         {
          this.toastrService.success('Succes',res.msg);
          document.getElementById('close_modal')?.click();
          this.userlists();
         }
         else{this.toastrService.error('Error!',res.msg);}
        }
        else{this.toastrService.error('Message please enter email!');}
      }
      else{this.toastrService.error('Message please enter mobile no!');}
    }
    else{this.toastrService.error('Message please enter name!');}
  }

  // create role
  async createRole()
  {
    const payload = this.roleData.value;
    if(payload['role_Name']!=''&&payload['role_Name']!=null&&payload['role_Name']!=undefined)
    {
      let  res= await this.service.createRole(payload);
      if(res.status==200)
      {

        this.toastrService.success('Succes',res.msg);
        document.getElementById('close_modal_role')?.click();
        this.roleLists();
      }
      else{this.toastrService.error('Error!',res.msg);}

    }
    else{this.toastrService.error('Message please enter role name!');}
  }

  // create Permissons
  async createPermisons()
  {
    const payload = this.permissonData.value;
    if(payload['permission_Name']!=''&&payload['permission_Name']!=null&&payload['permission_Name']!=undefined)
    {
      let  res= await this.service.createPermission(payload);
      if(res.status==201)
      {
       this.toastrService.success('Succes',res.msg);
       document.getElementById('close_modal_p')?.click();
       this.permissonslist();
      }
      else{this.toastrService.error('Error!',res.msg);}

    }
    else{this.toastrService.error('Message please enter permission_Name name!');}
  }


  // delete user
  async delteUser(user_id:any)
  {
 let res = await this.service.delteUser(user_id);
 if(res.status==200)
 {
  this.toastrService.success('Succes',res.msg);
  this.userlists();
 }else{this.toastrService.error('Error!',res.msg);}
  }

}
