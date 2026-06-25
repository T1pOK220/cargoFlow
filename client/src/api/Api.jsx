export const registration = async(FormBody) => {
    const res = await fetch("http://localhost:5000/api/registration", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
                body: JSON.stringify(FormBody)
    })
    const data = await res.json();
    return data;
}
export const login = async(FormBody) => {
    const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
                body: JSON.stringify(FormBody)
    })
    const data = await res.json();
    return {res:res,data:data};
}
export const verifyToken = async(token) => {
    try {
        const res = await fetch("http://localhost:5000/api/verify-token", {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await res.json();
    return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const createCargo = async (token,FormBody) => {
     try {
         const res = await fetch("http://localhost:5000/api/cargos/create", {
        method:"POST",
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormBody)
    })
    const data = await res.json();
         return {
             data: data,
             res:res
    };
    } catch (error) {
        console.log(error)
    }
}
export const getCargos = async (token) => {
    try {
        const res = await fetch("http://localhost:5000/api/cargos", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const getCargosByFilter= async (token,FormBody) => {
    try {
        const res = await fetch("http://localhost:5000/api/cargos/filter", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(FormBody)
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const getByUser = async(token) => {
    try {
    const res = await fetch("http://localhost:5000/api/cargos/byUser", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const deleteUser = async (token) => {
   try {
    const res = await fetch("http://localhost:5000/api/user/delete", {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const updateUser = async (FormBody,token) => {
    try {
    const res = await fetch("http://localhost:5000/api/user/update", {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
        body:JSON.stringify(FormBody)
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const changePassword = async (FormBody,token) => {
    try {
    const res = await fetch("http://localhost:5000/api/user/changePassword", {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
             body:JSON.stringify(FormBody)
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const addCar = async (FormBody,token) => {
    try {
    const res = await fetch("http://localhost:5000/api/vehicle/add", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
        },
             body:FormBody
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const getCarByUser = async (token) => {
    try {
    const res = await fetch("http://localhost:5000/api/vehicle/byUser", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        }
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const EditVehicle = async (FormBody,token) => {
     try {
    const res = await fetch("http://localhost:5000/api/vehicle/edit", {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
            body:JSON.stringify(FormBody)
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const DeleteVehicle = async (token,id) => {
     try {
    const res = await fetch(`http://localhost:5000/api/vehicle/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
        })
        const data = await res.json();
        return {data:data,res:res};
    } catch (error) {
        console.log(error)
    }
}
export const getCargoInfoByOne = async (token,id) => {
    try {
        const res = await fetch(`http://localhost:5000/api/cargos/info/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
        })
        const data = await res.json();
        return {data:data,res:res}
    } catch (error) {
             console.log(error)
    }
}
export const getAllCars = async (token) => {
    try {
        const res = await fetch(`http://localhost:5000/api/vehicles`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
        })
        const data = await res.json();
        return {data:data,res:res}
    } catch (error) {
             console.log(error)
    }
}
export const getOneCar = async (id,token) => {
    try {
        const res = await fetch(`http://localhost:5000/api/vehicles/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
        })
        const data = await res.json();
        return {data:data,res:res}
    } catch (error) {
             console.log(error)
    }
}
export const getFiltredCar = async (FormBody,token) => {
    try {
        const res = await fetch(`http://localhost:5000/api/vehicles/filter`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
               body: JSON.stringify(FormBody)
        })
        const data = await res.json();
        return {data:data,res:res}
    } catch (error) {
             console.log(error)
    }
}
export const getBill = async (token) => {
    try {
        const res = await fetch(`http://localhost:5000/api/payments/bill`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        },
        })
        const data = await res.json();
        return {data:data,res:res}
    } catch (error) {
             console.log(error)
    }
}
export const createBill = async (FormBody, token) => {
     try {
        const res = await fetch(`http://localhost:5000/api/payments/createBill`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormBody)
        })
        const data = await res.json();
        return {data:data,res:res}
    } catch (error) {
             console.log(error)
    }
}
export const createPayments = async (FormBody, token) => {
    try {
        const res = await fetch(`http://localhost:5000/api/payments/create`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormBody)
        })
        const data = await res.json();
        return {data:data,res:res}
    } catch (error) {
             console.log(error)
    }
}
export const getPaymentsByUser = async (token) => {
    try {
        const res = await fetch(`http://localhost:5000/api/payments/byUser`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json();
        return {data:data,res:res}
    } catch (error) {
             console.log(error)
    }
}
export const depost = async (FormBody,token) => {
    try {
        const res = await fetch(`http://localhost:5000/api/payments/deposit`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FormBody)
        })
        const data = await res.json();
        return {data:data,res:res}
    } catch (error) {
             console.log(error)
    }
}
export const updateAvatar = async (FormData,token) => {
    try {

        const response = await fetch(
            "http://localhost:5000/api/users/avatar", {
                method: "PATCH",
                headers: {
                'Authorization': `Bearer ${token}`
            },
                body: FormData
            }
            
        );

        const data = await response.json();
         return {data:data,res:response}
    }
    catch (err) {
        console.error(err);
    }

}