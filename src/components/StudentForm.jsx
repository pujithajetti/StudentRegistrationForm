import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validationSchema";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  age: "",
  gender: "",
  dob: "",
  address: { city: "", state: "", pincode: "" },
  academic: {
    rollNumber: "",
    collegeName: "",
    course: "",
    department: "",
    year: "",
    cgpa: ""
  },
  skills: [{ skill: "" }],
  profiles: { linkedin: "", github: "" },
  documents: { resume: null },
  account: { username: "", password: "", confirmpassword: "" }
};

function StudentForm({ onSubmitData, editData }) {
  const { register, handleSubmit, control, reset, setValue, formState: { errors, isSubmitting }, trigger } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "skills"
  });

  useEffect(() => {
    if (editData) {
      setStep(1);
      const skillsArray = editData.skills?.length ? editData.skills : [{ skill: "" }];

      reset({
        ...initialValues,
        ...editData,
        skills: skillsArray
      });

      replace(skillsArray);
    }
  }, [editData, reset, replace]);

  const onSubmit = (data) => {
    data.skills = data.skills.filter(s => s.skill.trim() !== "");

    const finalData = {
      ...data,
      id: editData?.id || Date.now()
    };

    onSubmitData(finalData);
    console.log("Final Submitted Data:", finalData);

    toast.success(
      editData ? "Student updated successfully!" : "Student added successfully!",
      {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      }
    );

    reset(initialValues);
    replace(initialValues.skills);
    setStep(1);
  };

  return (
    <div className="form-contain">
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div className="form-main">
            <div className="form-title">
              <h1>{editData ? "Edit Student" : "Student Registration Form"}</h1>
            </div>

            <div className="form-details">
              <div className="form-input">
                <label>Full Name</label>
                <input type='text' placeholder='Enter your name' {...register('name')} />
                {errors.name && <p className="error">{errors.name.message}</p>}
              </div>

              <div className="form-email">
                <label>Email</label>
                <input type='email' placeholder='Enter your email' {...register('email')} />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>

              <div className="form-phonenumber">
                <label>Phone Number</label>
                <input type='tel' placeholder='Enter your mobile number' maxLength="10" {...register('phoneNumber')} />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
              </div>

              <div className="form-age">
                <label>Age</label>
                <input type='number' placeholder='Enter your age' {...register('age')} />
                {errors.age && <p className="error">{errors.age.message}</p>}
              </div>

              <div className="form-gender">
                <label>Gender</label>
                <select {...register("gender")}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="error">{errors.gender.message}</p>}
              </div>

              <div className="form-dob">
                <label>Date of Birth</label>
                <input type="date" {...register("dob")} />
                {errors.dob && <p className="error">{errors.dob.message}</p>}
              </div>

              <div className="form-address">
                <label className="address-title">Address</label>

                <div className="city">
                  <label>City</label>
                  <input type="text" {...register('address.city')} placeholder="Enter your city" />
                  {errors.address?.city && (<p className="error">{errors.address.city.message}</p>)}
                </div>

                <div className="state">
                  <label>State</label>
                  <input type="text" {...register('address.state')} placeholder='Enter your state' />
                  {errors.address?.state && (<p className="error">{errors.address.state.message}</p>)}
                </div>

                <div className="pincode">
                  <label>Pincode</label>
                  <input type="text" maxLength="6" {...register('address.pincode')} placeholder='Enter your pincode' />
                  {errors.address?.pincode && (<p className="error">{errors.address.pincode.message}</p>)}
                </div>
              </div>

              <div className="form-navigation">
                <button
                  type='button'
                  className="btn btn-secondary"
                  onClick={async () => {
                    const valid = await trigger([
                      "name",
                      "email",
                      "phoneNumber",
                      "age",
                      "gender",
                      "dob",
                      "address.city",
                      "address.state",
                      "address.pincode"
                    ])
                    if (valid) { setStep(2) }
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-main">
            <div className="academic-section">
              <div className="academic-title">
                <h3>Academic Details</h3>
              </div>

              <div className='roll-no'>
                <label>Student ID</label>
                <input type='text' {...register('academic.rollNumber')} />
                {errors.academic?.rollNumber && (<p className="error">{errors.academic.rollNumber.message}</p>)}
              </div>

              <div className='clgname'>
                <label>College Name</label>
                <input type='text' {...register('academic.collegeName')} />
                {errors.academic?.collegeName && (<p className="error">{errors.academic.collegeName.message}</p>)}
              </div>

              <div className="course">
                <label>Course</label>
                <select {...register('academic.course')}>
                  <option value=''>Select course</option>
                  <option value='B.Tech'>B.Tech</option>
                  <option value='M.Tech'>M.Tech</option>
                  <option value='MBA'>MBA</option>
                  <option value='MCA'>MCA</option>
                </select>
                {errors.academic?.course && (<p className="error">{errors.academic.course.message}</p>)}
              </div>

              <div className="department">
                <label>Department</label>
                <select {...register('academic.department')}>
                  <option value=''>Select department</option>
                  <option value='CSE'>CSE</option>
                  <option value='AI & ML'>AI & ML</option>
                  <option value='DS'>DS</option>
                  <option value='CS'>CS</option>
                  <option value='ECE'>ECE</option>
                  <option value='EEE'>EEE</option>
                  <option value='MBA'>MBA</option>
                  <option value='MCA'>MCA</option>
                </select>
                {errors.academic?.department && (<p className="error">{errors.academic.department.message}</p>)}
              </div>

              <div className="year">
                <label>Year</label>
                <select {...register('academic.year')}>
                  <option value=''>Select year</option>
                  <option value='1st Year'>1st Year</option>
                  <option value='2nd Year'>2nd Year</option>
                  <option value='3rd Year'>3rd Year</option>
                  <option value='4th Year'>4th Year</option>
                </select>
                {errors.academic?.year && (<p className="error">{errors.academic.year.message}</p>)}
              </div>

              <div className='cgpa'>
                <label>CGPA</label>
                <input type='number' step="0.01" {...register('academic.cgpa')} />
                {errors.academic?.cgpa && (<p className="error">{errors.academic.cgpa.message}</p>)}
              </div>

              <div className="skills-section">
                <div className="skills">
                  <h2>Skills</h2>

                  {fields.map((field, index) => (
                    <div key={field.id} className="skill-row">
                      <input
                        type="text"
                        {...register(`skills.${index}.skill`)}
                        placeholder="Enter your skill"
                      />
                      {errors.skills?.[index]?.skill && (<p className="error">{errors.skills[index].skill.message}</p>)}

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          if (fields.length > 1) {
                            remove(index)
                          }
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-add"
                    onClick={() => append({ skill: "" })}
                  >
                    + Add Skill
                  </button>
                </div>
              </div>
            </div>

            <div className="form-navigations">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={async () => {
                  const valid = await trigger([
                    "academic.rollNumber",
                    "academic.collegeName",
                    "academic.course",
                    "academic.department",
                    "academic.year",
                    "academic.cgpa",
                    "skills"
                  ])
                  if (valid) {
                    setStep(3)
                  }
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-main">
            <div className="additional-details">
              <div className="additional-title">
                <h3>Additional Details</h3>
              </div>

              <div className="professional-profiles">
                <h3>Professional Profiles</h3>

                <div className="linkedin">
                  <label>LinkedIn</label>
                  <input type="url" placeholder="Enter LinkedIn profile" {...register('profiles.linkedin')} />
                </div>

                <div className="github">
                  <label>GitHub</label>
                  <input type="url" placeholder="Enter GitHub profile" {...register('profiles.github')} />
                </div>

                <div className="resume">
                  <label>Resume</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setValue("documents.resume", e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="account-details">
              <div className="account-title">
                <h3>Account Details</h3>
              </div>

              <div className="details">
                <div className="user-name">
                  <label>Username</label>
                  <input type="text" placeholder="Enter username" {...register('account.username')} />
                </div>

                <div className="password">
                  <label>Password</label>
                  <div className="password-input">
                    <input type={showPassword ? "text" : "password"} {...register('account.password')} />
                    <span onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.account?.password && (<p className="error">{errors.account.password.message}</p>)}
                </div>

                <div className="confirmpassword">
                  <label>Confirm Password</label>
                  <div className="password-input">
                    <input type={showConfirmPassword ? "text" : "password"} {...register('account.confirmpassword')} />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.account?.confirmpassword && (<p className="error">{errors.account.confirmpassword.message}</p>)}
                </div>
              </div>
            </div>

            <div className="form-navigations">
              <button type="button" className="btn back-btn" onClick={() => setStep(2)}>Back</button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={async () => {
                  const valid = await trigger([
                    "profiles.linkedin",
                    "profiles.github",
                    "account.username",
                    "account.password",
                    "account.confirmpassword"
                  ]);

                  if (valid) {
                    handleSubmit(onSubmit)();
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  reset(initialValues);
                  replace(initialValues.skills);
                  setStep(1);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </form>

      <ToastContainer />
    </div>
  );
}

export default StudentForm;