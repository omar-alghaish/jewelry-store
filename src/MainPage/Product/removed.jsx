<div className="col-lg-3 col-sm-6 col-12">
<div className="form-group">
  <label>فئه فرعيه</label>
  {/* <Select2
            className="select"
            data={options1}
            options={{
              placeholder: 'إختر فئه فرعيه',
            }} /> */}
  <select
    onChange={(e) => {
      setproddata({
        ...proddata,
        sub_category: e.target.value
      });
    }}
    value={proddata.category}
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    }}
    name=""
    id=""
  >
    {options1.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.text}
        </option>
      );
    })}
  </select>
</div>
</div>
<div className="col-lg-3 col-sm-6 col-12">
<div className="form-group">
  <label>ماركة</label>
  {/* <Select2
            className="select"
            data={options2}
            options={{
              placeholder: 'إختر ماركة',
            }} /> */}
  <select
    onChange={(e) => {
      setproddata({ ...proddata, brand: e.target.value });
    }}
    value={proddata.category}
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    }}
    name=""
    id=""
  >
    {options2.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.text}
        </option>
      );
    })}
  </select>
</div>
</div>
<div className="col-lg-3 col-sm-6 col-12">
<div className="form-group">
  <label>وحده</label>
  {/* <Select2
            className="select"
            data={options3}
            options={{
              placeholder: 'إختر ماركة',
            }} /> */}
  <select
    onChange={(e) => {
      setproddata({ ...proddata, unit: e.target.value });
    }}
    value={proddata.unit}
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    }}
    name=""
    id=""
  >
    {options3.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.text}
        </option>
      );
    })}
  </select>
</div>
</div>
<div className="col-lg-3 col-sm-6 col-12">
<div className="form-group">
  <label>رمز التخزين التعريفي</label>
  <input
    onChange={(e) => {
      setproddata({ ...proddata, sku: e.target.value });
    }}
    type="text"
  />
</div>
</div>
<div className="col-lg-3 col-sm-6 col-12">
<div className="form-group">
  <label>الحد الأدنى للكميه</label>
  <input
    onChange={(e) => {
      setproddata({
        ...proddata,
        min_quantity: e.target.value
      });
    }}
    type="text"
  />
</div>
</div>




<div className="col-lg-3 col-sm-6 col-12">
<div className="form-group">
  <label>الضريبه</label>
  {/* <Select2
            className="select"
            data={options4}
            options={{
              placeholder: 'إختر الضريبه',
            }} /> */}

  <select
    onChange={(e) => {
      setproddata({ ...proddata, tax: e.target.value });
    }}
    value={proddata.tax}
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    }}
    name=""
    id=""
  >
    {options4.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.text}
        </option>
      );
    })}
  </select>
</div>
</div>
<div className="col-lg-3 col-sm-6 col-12">
<div className="form-group">
  <label>نوع الخصم</label>
  {/* <Select2
            className="select"
            data={options5}
            options={{
              placeholder: 'النسبه المئويه',
            }} /> */}
  <select
    onChange={(e) => {
      setproddata({ ...proddata, tax_type: e.target.value });
    }}
    value={proddata.tax_type}
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    }}
    name=""
    id=""
  >
    {options.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.text}
        </option>
      );
    })}
  </select>
</div>
</div>


<div className="col-lg-3 col-sm-6 col-12">
<div className="form-group">
  <label> الحاله</label>
  {/* <Select2
            className="select"
            data={options6}
            options={{
              placeholder: 'إختر المنتج',
            }} /> */}
  <select
    value={proddata.status}
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    }}
    name=""
    id=""
  >
    {options6.map((item, index) => {
      return (
        <option key={index} value={item.id}>
          {item.text}
        </option>
      );
    })}
  </select>
</div>
</div>