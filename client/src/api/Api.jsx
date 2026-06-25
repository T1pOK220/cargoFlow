const API_URL = import.meta.env.VITE_API_URL;
console.log(import.meta.env);
console.log(API_URL);
export const registration = async (FormBody) => {
    const res = await fetch(`${API_URL}registration`, {
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
    const res = await fetch(`${API_URL}login`, {
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
        const res = await fetch(`${API_URL}verify-token`, {
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
         const res = await fetch(`${API_URL}cargos/create`, {
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
        const res = await fetch(`${API_URL}cargos`, {
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
        const res = await fetch(`${API_URL}cargos/filter`, {
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
    const res = await fetch(`${API_URL}cargos/byUser`, {
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
    const res = await fetch(`${API_URL}user/delete`, {
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
    const res = await fetch(`${API_URL}user/update`, {
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
    const res = await fetch(`${API_URL}user/changePassword`, {
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
    const res = await fetch(`${API_URL}vehicle/add`, {
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
    const res = await fetch(`${API_URL}vehicle/byUser`, {
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
    const res = await fetch(`${API_URL}vehicle/edit`, {
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
    const res = await fetch(`${API_URL}vehicle/delete/${id}`, {
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
        const res = await fetch(`${API_URL}cargos/info/${id}`, {
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
        const res = await fetch(`${API_URL}vehicles`, {
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
        const res = await fetch(`${API_URL}vehicles/${id}`, {
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
        const res = await fetch(`${API_URL}vehicles/filter`, {
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
        const res = await fetch(`${API_URL}payments/bill`, {
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
        const res = await fetch(`${API_URL}payments/createBill`, {
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
        const res = await fetch(`${API_URL}payments/create`, {
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
        const res = await fetch(`${API_URL}payments/byUser`, {
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
        const res = await fetch(`${API_URL}payments/deposit`, {
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
            `${API_URL}users/avatar`, {
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