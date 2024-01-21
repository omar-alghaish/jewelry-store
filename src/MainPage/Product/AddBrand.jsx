import React, { useState } from 'react';
import { Upload } from '../../EntryFile/imagePath';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from 'feather-icons-react/build/IconComponents';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AddBrand = () => {
  const history=useHistory()
  const [img,setimg]=useState(null)
  const [brandloading,setbrandloading]=useState(false)
  const [imgloading,setimgloading]=useState(false)
  const [brand,setbrand]=useState({
    name:'',
    description:'',
    image:'',
  });
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
  const hadleaddbrand=()=>{
    if(brand.name==""||brand.description==""){
      toast.warn("أكمل باقى البيانات")
      return;
    }
    const data_send={
      ...brand
    }
    setbrandloading(true)
    axios.post("",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
      }
      else if (res.data.status=='error'){
        toast.error("حدث خطأ ما")
      }
    }).catch(err=>console.log(err))
    .finally(()=>{
      setbrandloading(false)
    })
  }
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>إضافة ماركه</h4>
                            <h6>إضافة ماركه جديده</h6>
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
                                          setbrand({...brand,name:e.target.value})
                                        }} type="text" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>الوصف</label>
                                        <textarea onChange={(e)=>{
                                          setbrand({...brand,description:e.target.value})
                                        }} className="form-control" defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label> صورة الماركه</label>
                                        <div className="image-upload">
                                            <input onChange={(e)=>{
                                              setimg(e.target.files[0])
                                            }} type="file" />
                                            <div className="image-uploads">
                                                <img src={Upload} alt="img" />
                                                <h4>إسحب الصوره هنا</h4>
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
                                <div className="col-lg-12">
                                <button disabled={brandloading} style={{ cursor:brandloading?'no-drop':'pointer' }} onClick={()=>{
                                      // handleaddcat()
                                      hadleaddbrand()
                                    }} className="btn btn-submit me-2">
                                        {
                                          brandloading?<Loader/>:'إنشاء'
                                        }
                                    </button>
                                    <button onClick={()=>{
                                      history.push("/dream-pos/product/brandlist-product")
                                    }} className="btn btn-cancel">
                                        إلغاء
                                    </button>
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

export default AddBrand;
