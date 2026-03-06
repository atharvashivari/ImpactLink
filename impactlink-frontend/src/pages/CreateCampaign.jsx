import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { fadeUp, gpuStyles, cardHover, buttonTap, slideDown, stepVariants } from "../utils/animations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowRight, ArrowLeft, Check, Image as ImageIcon } from "lucide-react";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/reactbits/FadeIn";




const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [campaign, setCampaign] = useState({ title: "", description: "", goal: "", category: "", startDate: "", endDate: "", imageUrl: "", razorpayKey: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setCampaign({ ...campaign, [e.target.name]: e.target.value });
  const nextStep = () => { if (step < 3) { setDirection(1); setStep(step + 1); } };
  const prevStep = () => { if (step > 1) { setDirection(-1); setStep(step - 1); } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== 3) { nextStep(); return; }
    setLoading(true); setError("");
    const token = localStorage.getItem("token");
    if (!token) { setError("Authentication required."); setLoading(false); return; }
    try {
      const response = await fetch("http://localhost:5000/api/campaigns", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: campaign.title, description: campaign.description, goalAmount: parseFloat(campaign.goal), image: campaign.imageUrl, startDate: campaign.startDate, endDate: campaign.endDate }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create campaign.");
      toast.success("Campaign created successfully!"); navigate("/campaigns");
    } catch (err) { setError(err.message); toast.error(err.message); } finally { setLoading(false); }
  };

  return (
    <PageTransition className="page-container py-5 mt-3">
      <div className="container" style={{ maxWidth: "800px" }}>
        <FadeIn>
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">Start a Campaign</h2>
            <p className="text-muted">Turn your idea into a reality by launching a campaign today.</p>
          </div>
        </FadeIn>

        {/* Stepper */}
        <div className="mb-5 px-3 px-md-5">
          <div className="d-flex justify-content-between position-relative">
            <div className="progress position-absolute top-50 start-0 w-100 translate-middle-y z-0" style={{ height: "4px" }}>
              <m.div className="progress-bar bg-primary" role="progressbar" animate={{ width: `${((step - 1) / 2) * 100}%` }} transition={{ duration: 0.4 }}></m.div>
            </div>
            {[1, 2, 3].map((num) => (
              <m.div key={num} className={`position-relative z-1 rounded-circle d-flex align-items-center justify-content-center fw-bold ${step >= num ? 'bg-primary text-white' : 'bg-light text-muted border'}`} style={{ width: "40px", height: "40px" }} animate={{ scale: step === num ? 1.15 : 1 }} transition={{ duration: 0.3 }}>
                {step > num ? <Check size={20} /> : num}
              </m.div>
            ))}
          </div>
          <div className="d-flex justify-content-between mt-2 text-muted small fw-medium">
            <span className={step >= 1 ? "text-primary fw-bold" : ""}>Basics</span>
            <span className={step >= 2 ? "text-primary fw-bold" : ""} style={{ transform: "translateX(-10px)" }}>Details</span>
            <span className={step >= 3 ? "text-primary fw-bold" : ""}>Review</span>
          </div>
        </div>

        <div className="custom-card p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mb-4">{error}</div>}
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <m.div key="s1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35 }}>
                  <h4 className="fw-bold mb-4">Let's start with the basics</h4>
                  <div className="mb-4"><label className="label-custom">Campaign Title</label><input type="text" name="title" className="input-custom form-control-lg" placeholder="E.g., Save the local community center" value={campaign.title} onChange={handleChange} required /></div>
                  <div className="mb-4"><label className="label-custom">Category</label><select name="category" className="input-custom form-select form-select-lg text-muted" value={campaign.category} onChange={handleChange} required><option value="">Select a category</option><option value="Technology">Technology</option><option value="Health">Health</option><option value="Education">Education</option><option value="Social Cause">Social Cause</option></select></div>
                  <div className="mb-4"><label className="label-custom">Funding Goal ($)</label><div className="input-group input-group-lg"><span className="input-group-text bg-white border-end-0 text-muted">$</span><input type="number" name="goal" className="form-control border-start-0 ps-0" style={{ boxShadow: "none", borderColor: "#e5e7eb" }} step="0.01" placeholder="5000" value={campaign.goal} onChange={handleChange} required /></div></div>
                </m.div>
              )}
              {step === 2 && (
                <m.div key="s2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35 }}>
                  <h4 className="fw-bold mb-4">Add your campaign details</h4>
                  <div className="mb-4"><label className="label-custom">Description</label><textarea name="description" className="input-custom" rows="6" placeholder="Tell your story..." value={campaign.description} onChange={handleChange} required></textarea></div>
                  <div className="row g-3 mb-4"><div className="col-md-6"><label className="label-custom">Start Date</label><input type="date" name="startDate" className="input-custom" value={campaign.startDate} onChange={handleChange} required /></div><div className="col-md-6"><label className="label-custom">End Date</label><input type="date" name="endDate" className="input-custom" value={campaign.endDate} onChange={handleChange} required /></div></div>
                </m.div>
              )}
              {step === 3 && (
                <m.div key="s3" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35 }}>
                  <h4 className="fw-bold mb-4">Add media and review</h4>
                  <div className="mb-4"><label className="label-custom">Campaign Image URL</label><input type="url" name="imageUrl" className="input-custom" placeholder="https://example.com/image.jpg" value={campaign.imageUrl} onChange={handleChange} required /><small className="text-muted mt-2 d-block">Provide a high-quality image URL.</small></div>
                  {campaign.imageUrl ? (<div className="mb-5 mt-4 p-2 border rounded bg-light"><img src={campaign.imageUrl} alt="Preview" className="img-fluid rounded w-100 object-fit-cover" style={{ height: "250px" }} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/800x400?text=Invalid+Image+URL"; }} /></div>) : (<div className="mb-5 mt-4 border rounded bg-light d-flex flex-column align-items-center justify-content-center text-muted" style={{ height: "250px" }}><ImageIcon size={48} className="mb-2 opacity-50" /><p>Image preview will appear here</p></div>)}
                  <div className="alert bg-primary-subtle text-primary border-primary border-opacity-25 rounded p-3"><div className="d-flex gap-2"><Check size={20} className="mt-1 flex-shrink-0" /><div><strong>Ready to launch!</strong> Please review your details before submitting.</div></div></div>
                </m.div>
              )}
            </AnimatePresence>

            <div className={`d-flex mt-5 ${step === 1 ? 'justify-content-end' : 'justify-content-between'}`}>
              {step > 1 && (<m.button type="button" className="btn btn-outline-custom d-flex align-items-center gap-2" onClick={prevStep} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><ArrowLeft size={18} /> Back</m.button>)}
              <m.button type="submit" className="btn-primary-custom d-flex align-items-center gap-2" disabled={loading} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {step < 3 ? (<>Continue <ArrowRight size={18} /></>) : loading ? (<><div className="spinner-border spinner-border-sm" role="status"></div> Launching...</>) : (<>Launch Campaign</>)}
              </m.button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default CreateCampaign;
