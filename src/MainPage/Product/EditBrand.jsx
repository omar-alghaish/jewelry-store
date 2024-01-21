import React, { useEffect, useState } from 'react'
// import {Link} from "react-router-dom"
import {  Upload } from '../../EntryFile/imagePath'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Loader } from 'feather-icons-react/build/IconComponents'

const EditBrand = () =>{
  const location=useLocation();
  const history=useHistory();
    // console.log(location)
    const {brandData}=location.state;
    // console.log(brandData)
    const [brand,setbrand]=useState({});
    const [img,setimg]=useState(null)
    const [updateloading,setupdateloaidng]=useState(false)
    const [imgloading,setimgloading]=useState(false)
    const handleuploadimg = () => {
      if (img == null) {
        toast.warn("إختر صوره أولا");
        return;
      }
      setimgloading(true);
      const formdata = new FormData();
      formdata.append("image", img);
      axios
        .post("https://camp-coding.tech/agancy/image_uplouder.php", formdata)
        .then((res) => {
          if (res.data !== "") {
            setbrand({...brand,img:res.data});
            // seticon(res.data);
            // setadddata({ ...adddata, image: res.data });
            toast.success("تم الرفع بنجاح");
            // social_accounts[i]["icon"] = res.data;
          } else {
            toast.error("لم يتم الرفع");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setimgloading(false);
        });
    };
    const handleEditBrand=()=>{
      const data_send={...brand};
      axios.post("",JSON.stringify(data_send))
      .then((res)=>{
        if(res.data.status=='success'){
          toast.success(res.data.message);
        }
        else if (res.data.status=='error'){
          toast.error(res.data.message);
        }
        else{
          toast.error("حدث خطأ ما")
        }
      }).catch(err=>console.log(err))
      .finally(()=>{
        setupdateloaidng(false)
      })
    }
    useEffect(()=>{
      if(location.state==null){
        history.goBack();
      }
      setbrand(brandData)
    },[])
    return(
        <>
        <div className="page-wrapper">
  <div className="content">
    <div className="page-header">
      <div className="page-title">
        <h4>تعديل الماركه</h4>
        <h6>حدث هذه الماركه</h6>
      </div>
    </div>
    {/* /add */}
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="form-group">
              <label>إسم الماركه</label>
              <input onChange={(e)=>{
                setbrand({...brand,brandName:e.target.value})
              }} value={brand.brandName} type="text" defaultValue="samsung" />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>وصف الماركه</label>
              <textarea
                onChange={(e)=>{
                  setbrand({...brand,brandDescription:e.target.value})
                }} value={brand.brandDescription}
                className="form-control"
                defaultValue={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
                }
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label> صورة المنتج</label>
              <div className="image-upload">
                <input onChange={(e)=>{
                  setimg(e.target.files[0])
                }} type="file" />
                <div className="image-uploads">
                  <img src={Upload}alt="img" />
                  <h4>إسحب الملف المرفوع هنا</h4>
                </div>

              </div>
              <div style={{
                  textAlign:'center',
                }}>
                  <button
                    disabled={imgloading}
                    onClick={()=>{
                      handleuploadimg()
                    }}
                    style={{cursor:imgloading?'no-drop':'pointer', width:'200px',padding:'10px',borderRadius:'10px',border:'none',backgroundColor:'#ffc107',color:'white' }}
                  >{imgloading?<Loader/>:'رفع الصوره'}</button>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="product-list">
              <ul className="row">
                <li>
                  <div className="productviews">
                    <div className="productviewsimg">
                      <img src={brand.image} alt="img" />
                    </div>
                    <div className="productviewscontent">
                      <div className="productviewsname">
                        <h2>{brand.brandName}</h2>
                        {/* <h3>581kb</h3> */}
                      </div>
                      <a href="#">x</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12">
          <button
            onClick={()=>{
              handleEditBrand()
            }}
            disabled={updateloading}
            style={{ cursor:updateloading?'no-drop':'pointer' }}
            className="btn btn-submit me-2">
              {
                updateloading?<Loader/>:'تعديل'
              }
          </button>
            <span onClick={()=>{
              history.push("/dream-pos/product/brandlist-product")
            }} className="btn btn-cancel">
              إلغاء
            </span>
          </div>
        </div>
      </div>
    </div>
    {/* /add */}
  </div>
</div>

        </>
    )
}

export default EditBrand
