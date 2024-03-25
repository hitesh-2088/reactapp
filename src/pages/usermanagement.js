import { useForm } from 'react-hook-form';

const UserMangment = () => {
    const schema = Yup.object().shape({
        username: Yup.string().required().min(3).max(25),
        email: Yup.string().email().required(),
        dob: Yup.string().required().min(8).max(25),
      });
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger
      } = useForm({
        resolver:yupResolver(schema),
        mode:"onBlur",
        defaultValues:{
            username:'',
            dob:'',
            email:'',
            aadhar:'',
            mobile:'',
            plan_id:'',
            active:''
        }
      });
    return (
        <>
        {heading}
        {errors}
        <form onSubmit={handleSubmit}>

            <div><label>Enter your username:
            <input  type="text" name="username" value={inputs.username || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Enter your DOB:
            <input type="text" name="dob" value={inputs.dob || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Enter your Email:
            <input type="text" name="email" value={inputs.email || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Enter your Aadhar:
            <input type="text" name="aadhar" value={inputs.aadhar || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Mobile Number :
            <input type="text" name="mobile" value={inputs.mobile || ""} onChange={handleChange} />
            </label>
            </div>
            <div>
            <label>Choose Plan:
            <select name="plan_id" className="form-control" value={inputs.plan_id || ""} onChange={handleChange}>
                <option value="">---Please Select Plan---</option>
                {plan.map(p => (
                    <option value={p.id}>{p.name}</option>)
                )}
            </select>
            </label>
            </div>
            <div>
            <label>Activate Plan:
            <select name="active" className="form-control" value={inputs.active || ""} onChange={handleChange}>
                <option value="">---Please Select Activation---</option>
                <option value="1">Activate</option>
                <option value="2">Deactivate</option>
            </select>
            </label>
            </div>
            <input type="submit" />
        </form>
      </>
    )
}

export default UserMangment;