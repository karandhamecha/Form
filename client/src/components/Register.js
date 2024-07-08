import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { adddata } from './context/ContextProvider';



const Register = () => {
    const { udata, setUdata } = useContext(adddata);
   
    


    const [inpval, setINP] = useState({
        Company_Name: "",
        Company_Code: "",
        Company_Location: "",
        Company_Pincode: ""
    });

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target; 
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            };
        });
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { Company_Name, Company_Location, Company_Pincode, Company_Code } = inpval;

        if (Company_Name === "") {
            alert("Company_Name is required");
        } else if (Company_Location === "") {
            alert("Company_Location is required");
        } else if (Company_Code === "") {
            alert("Company_Code is required");
        } else if (Company_Pincode === "") {
            alert("Company_Pincode is required");
        } else {
            const res = await fetch("http://localhost:3000/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Company_Name,
                    Company_Location,
                    Company_Pincode,
                    Company_Code
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");
            } else {
                
                setUdata(data);
                console.log("data added");
            }
        }
    };

    const resetForm = () => {
        setINP({
            Company_Name: "",
            Company_Code: "",
            Company_Location: "",
            Company_Pincode: ""
        });
    };
    const navigateToHome = () => {
        window.location.href = "/";
    };
  

    return (
        <div className="container">
            <h1 className='text-red-700'> Form </h1>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="Company_Name" className="form-label">Company_Name</label>
                        <input
                            type="text"
                            value={inpval.Company_Name}
                            onChange={setdata}
                            name="Company_Name"
                            className="form-control"
                            id="Company_Name"
                        />
                    </div>
                    
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="Company_Code" className="form-label">Company_Code</label>
                        <input
                            type="text"
                            value={inpval.Company_Code}
                            onChange={setdata}
                            name="Company_Code"
                            className="form-control"
                            id="Company_Code"
                        />
                    </div>
                   
                    
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="Company_Location" className="form-label">Company_Location</label>
                        <input
                            type="text"
                            value={inpval.Company_Location}
                            onChange={setdata}
                            name="Company_Location"
                            className="form-control"
                            id="Company_Location"
                        />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="Company_Pincode" className="form-label">Company_Pincode</label>
                        <textarea
                            name="Company_Pincode"
                            value={inpval.Company_Pincode}
                            onChange={setdata}
                            className="form-control"
                            id="Company_Pincode"
                        />
                    </div>

                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                    <button type="button" onClick={resetForm} className="btn btn-secondary">Reset</button>
                    <button type="button" onClick={navigateToHome} className="btn btn-info">List</button>


                    

                    
                </div>
            </form>
        </div>
    );
};

export default Register;
