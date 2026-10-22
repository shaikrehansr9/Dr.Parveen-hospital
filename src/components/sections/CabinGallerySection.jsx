// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import {
//   ZoomIn,
//   X,
//   Bed,
//   Calendar,
//   Building,
//   ShieldCheck,
//   CheckCircle2,
//   ChevronRight,
//   Sparkles,
//   Phone,
//   MessageCircle,
// } from "lucide-react";
// import Badge from "@/components/ui/Badge";
// import Button from "@/components/ui/Button";
// import { HOSPITAL_INFRASTRUCTURE, HOSPITAL_INFO } from "@/lib/constants";
// import { getWhatsAppUrl } from "@/lib/utils";

// const CATEGORIES = [
//   "All",
//   "Cabin & Rooms",
//   "Surgical Suite",
//   "Emergency",
//   "Diagnostics",
//   "Patient Care",
//   "Facility",
// ];

// export default function CabinGallerySection({ onOpenBooking }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [lightboxItem, setLightboxItem] = useState(null);

//   // Close lightbox on Escape key
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") setLightboxItem(null);
//     };
//     if (lightboxItem) {
//       window.addEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "hidden";
//     }
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "unset";
//     };
//   }, [lightboxItem]);

//   const filtered =
//     activeCategory === "All"
//       ? HOSPITAL_INFRASTRUCTURE
//       : HOSPITAL_INFRASTRUCTURE.filter((item) => {
//           if (activeCategory === "Diagnostics") {
//             return item.category === "Diagnostics" || item.category === "Imaging";
//           }
//           return item.category === activeCategory;
//         });

//   const whatsappUrl = getWhatsAppUrl(
//     HOSPITAL_INFO.whatsappPhone,
//     "Hello Dr. Parween's Hospital, I would like to inquire about private cabin admission and hospital facilities."
//   );

//   return (
//     <section
//       id="gallery"
//       ref={ref}
//       className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
//     >
//       {/* Background Ambience */}
//       <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
//         <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
//         <div className="absolute -left-32 top-1/3 h-[450px] w-[450px] rounded-full bg-brand-500/5 blur-3xl" />
//         <div className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl" />
//       </div>

//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//           className="mx-auto mb-10 max-w-3xl text-center space-y-3"
//         >
//           <Badge variant="cyan" size="md" dot>
//             Hospital Infrastructure &amp; Private Cabins
//           </Badge>

//           <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
//             State-of-the-Art <span className="text-primary-600">Facilities &amp; AC Cabins</span>
//           </h2>

//           <p className="text-base text-slate-600 sm:text-lg leading-relaxed">
//             Take a visual tour of our spacious private patient suites, modern modular operation
//             theatre, computerized diagnostic lab, and comfortable maternity care units in Sangareddy.
//           </p>
//         </motion.div>

//         {/* Category Filter Pills */}
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="mb-10 flex flex-wrap items-center justify-center gap-2"
//         >
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               type="button"
//               onClick={() => setActiveCategory(cat)}
//               className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
//                 activeCategory === cat
//                   ? "bg-brand-blue text-white shadow-md shadow-brand-500/25 scale-[1.03]"
//                   : "bg-white text-slate-600 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-blue"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </motion.div>

//         {/* Gallery Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           <AnimatePresence mode="popLayout">
//             {filtered.map((item, idx) => (
//               <motion.article
//                 key={item.id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.94 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.94 }}
//                 transition={{ duration: 0.4, delay: idx * 0.04 }}
//                 whileHover={{ y: -4 }}
//                 onClick={() => setLightboxItem(item)}
//                 className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all duration-300 hover:border-brand-400/50 hover:shadow-xl cursor-pointer"
//               >
//                 {/* Photo Frame */}
//                 <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
//                   <Image
//                     src={item.image}
//                     alt={item.title}
//                     fill
//                     quality={90}
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

//                   {/* Category Pill */}
//                   <div className="absolute top-3 left-3">
//                     <span className="rounded-lg bg-navy-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/10 shadow-sm">
//                       {item.category}
//                     </span>
//                   </div>

//                   {/* Zoom Preview Overlay */}
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-navy-950/30 backdrop-blur-[2px]">
//                     <div className="flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-navy-950 shadow-lg scale-90 group-hover:scale-100 transition-transform">
//                       <ZoomIn className="h-4 w-4 text-brand-blue" />
//                       <span>View Full Image</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Card Info */}
//                 <div className="flex flex-1 flex-col justify-between p-5">
//                   <div>
//                     <h3 className="font-heading text-base font-bold text-navy-950 group-hover:text-brand-blue transition-colors">
//                       {item.title}
//                     </h3>
//                     <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
//                       {item.description}
//                     </p>
//                   </div>

//                   <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-brand-blue">
//                     <span className="flex items-center gap-1">
//                       <Building className="h-3.5 w-3.5" />
//                       Facility Feature
//                     </span>
//                     <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
//                       Expand &bull; Details
//                     </span>
//                   </div>
//                 </div>
//               </motion.article>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Facility Trust & Inquiry Banner */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-12 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-brand-950 p-6 sm:p-8 text-white shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
//         >
//           <div className="space-y-2 text-center md:text-left">
//             <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-300 uppercase tracking-wider">
//               <Sparkles className="h-4 w-4" />
//               <span>Personalized Maternity Stays</span>
//             </div>
//             <h3 className="text-xl sm:text-2xl font-extrabold text-white">
//               Planning a delivery or surgery? Visit our facility in Sangareddy.
//             </h3>
//             <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
//               We offer pre-admission cabin walkthroughs so expecting mothers and families can see
//               our private suites, sanitized recovery rooms, and neonatal facilities firsthand.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
//             <Button
//               variant="primary"
//               size="md"
//               onClick={onOpenBooking}
//               icon={Calendar}
//               className="shadow-lg shadow-brand-500/25"
//             >
//               Book Hospital Visit
//             </Button>
//             <a
//               href={whatsappUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md"
//             >
//               <MessageCircle className="h-4 w-4" />
//               <span>WhatsApp Inquiries</span>
//             </a>
//           </div>
//         </motion.div>
//       </div>

//       {/* Lightbox Zoom Modal */}
//       <AnimatePresence>
//         {lightboxItem && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setLightboxItem(null)}
//               className="absolute inset-0 bg-black/85 backdrop-blur-md"
//               aria-hidden="true"
//             />

//             {/* Modal Box */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 15 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 15 }}
//               transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
//               className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-navy-950 border border-white/15 text-white shadow-2xl flex flex-col max-h-[90vh]"
//             >
//               {/* Close Button */}
//               <button
//                 type="button"
//                 onClick={() => setLightboxItem(null)}
//                 className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-navy-950"
//                 aria-label="Close photo view"
//               >
//                 <X className="h-5 w-5" />
//               </button>

//               {/* Photo View */}
//               <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
//                 <Image
//                   src={lightboxItem.image}
//                   alt={lightboxItem.title}
//                   fill
//                   quality={95}
//                   priority
//                   className="object-contain"
//                 />
//               </div>

//               {/* Info Bar & Actions */}
//               <div className="p-6 sm:p-7 space-y-4 bg-navy-950 border-t border-white/10">
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <div>
//                     <span className="inline-block rounded-lg bg-brand-blue/30 px-2.5 py-1 text-xs font-bold text-brand-300 border border-brand-400/30">
//                       {lightboxItem.category}
//                     </span>
//                     <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
//                       {lightboxItem.title}
//                     </h3>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => {
//                         setLightboxItem(null);
//                         onOpenBooking?.();
//                       }}
//                       icon={Calendar}
//                     >
//                       Book Visit / Admission
//                     </Button>
//                   </div>
//                 </div>

//                 <p className="text-sm text-slate-300 leading-relaxed">
//                   {lightboxItem.description}
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
