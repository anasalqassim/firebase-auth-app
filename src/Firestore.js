
import { db } from "./firebase"
import {addDoc , collection, getDoc, doc,setDoc} from "firebase/firestore"




export const checkEmployeeExist = async (employeeNum) => {

    const docRef = doc(db, "employees", employeeNum);
    
    
    const docSnap = await (await getDoc(docRef)).exists();



    return docSnap;
}

export const registerEmployee = async (employeeNum,name,birthday) =>{
    const employeeCollectionRef = collection(db,"employees");
     await setDoc(doc(employeeCollectionRef,"123456"),{
        name:name,
        employeeNum:employeeNum,
        birthday:birthday  
     })
}


