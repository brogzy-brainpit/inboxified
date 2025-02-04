
const { Body, Container, Head, Html, Preview, render ,}=require("@react-email/components")
const {calcBtn,calcBtnPerc,calcRowBtn, check,containerChildStyle, imagify} =require("./check")
const Emailifier=({state})=>{
 const ht= state?.newContent?.content?.map(({title,text,style:styling,content,src,alt,href,id},index)=>{
   if(title=="text"){
     return <table width="100%" border="0" cellspacing="0" cellpadding="0" >
     <tr width="100%">
             <td align='center'   style={{paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px`,}}>
            <table align={styling.containerAlignment} width={styling.width} border="0" cellspacing="0" cellpadding="0" >
        <tr width="100%">              
        <td align='center' className={styling.textAlign2?styling.textAlign2:""}  style={check(styling,"normal-text")} >  
                   <multiline><div id={`mc${id}`} style={{ color:styling.color,textDecoration:"none"}}>{text}</div></multiline>
          </td>
           </tr>
            </table>
             </td>
           </tr>
         </table>
   } 
   if(title=="link"){
     return <table width="100%" border="0" cellspacing="0" cellpadding="0" >
     <tr width="100%">
             <td align='center' style={{paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px`,}}>
            <table align={styling.containerAlignment} width={styling.width} border="0" cellspacing="0" cellpadding="0" >
        <tr width="100%">              
        <td align='center' className={styling.textAlign2?styling.textAlign2:""}   style={check(styling,"normal-text")} >  
                   <multiline><a href={styling.href} id={`mc${id}`} style={{ color:styling.color,textDecoration:styling.textDecoration}}><span style={{ color:styling.color,textDecoration:"none"}}>{text}</span></a></multiline>
          </td>
           </tr>
            </table>
             </td>
           </tr>
         </table>
   } if(title=="paragraph"){
     return <table width="100%" border="0" cellspacing="0" cellpadding="0" >
     <tr width="100%">
             <td align='center' style={{paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px`,}}>
            <table align={styling.containerAlignment} width={styling.width} border="0" cellspacing="0" cellpadding="0" >
        <tr width="100%">              
        <td align='center' className={styling.textAlign2?styling.textAlign2:""}   style={check(styling,"normal-text")} >  
        <multiline><div id={`mc${id}`} style={{ color:styling.color,textDecoration:"none"}}>{text}</div></multiline>
          </td>
           </tr>
            </table>
             </td>
           </tr>
         </table>
   } 
   if(title=="html"){
     return <table  width="100%" border="0" cellspacing="0" cellpadding="0" >
     <tr width="100%">
             <td width={"100%"} id={`mc${id}`} align='center' style={{paddingBottom:`${styling.marginBottom}px`,
         paddingTop:`${styling.marginTop}px`,paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px`,}}>
                 <JsxParser  renderUnrecognized={true} renderInWrapper={false} allowUnknownElements={true} disableFragments autoCloseVoidElements componentsOnly={false }  components={{Button, Column, Img, Section, Container, Text, Row, Hr, Heading,Font,Link,Spacer}} jsx={`${text}`} />

  
         {/* <Interweave  noWrap content={text}/> */}
       
             </td>
           </tr>
         </table>
   }
 if(title=="button"){
   return <table class='center' width="100%" border="0" cellspacing="0" cellpadding="0" >
   <tr width="100%" style={{margin:"0 auto"}}>
   <td width={"100%"}   align={styling.containerAlignment}  >
           <table className={styling.textAlign2?styling.textAlign2:""}  border="0" cellspacing="0" cellpadding="0" style={{paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px`,paddingBottom:`${styling.marginBottom}px`,paddingTop:`${styling.marginTop}px`}} >
         <tr width="100%">
                 <td width={styling.width.includes("%")?calcRowBtn(styling.width,"650px"):styling.width}  style={{maxWidth:"650px",fontFamily:styling.fontFamily,color:styling.color,fontSize:`${styling.fontSize}px`,lineHeight:`${styling.fontSize}px`,}}>
                
 {"\n"}
 {`<!--BUTTON -->`}
 {"\n"}
                  <div > 
                  {`<!--[if mso]>
       <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href=${styling.href} style="height:38px;v-text-anchor:middle;width:${styling.width.includes("%")?calcRowBtn(styling.width,styling.width):`${styling.width}`};" arcsize="${(styling.borderBottomLeftRadius/styling.width)*100}%" strokecolor="${styling.borderWidth<1?styling.backgroundColor:styling.borderColor}" fillcolor="${styling.backgroundColor}">
         <w:anchorlock/>
         <center style="color:${styling.color};font-family:${styling.fontFamily};font-size:${styling.fontSize};font-weight:${styling.fontWeight};">${text}</center>
       </v:roundrect>
     <![endif]--><a href="${styling.href}" id="mc${id}"
     style="letter-spacing:${styling.letterSpacing}px;lineHeight:${styling.fontSize}px;font-weight:${styling.fontWeight};text-transform:${styling.textTransform};background-color:${styling.backgroundColor};border:${styling.borderWidth}px ${styling.borderColor} ${styling.borderStyle};border-radius:${styling.borderRadius}px;color:${styling.color};display:block;font-family:${styling.fontFamily};padding:${styling.paddingVert}px ${styling.paddingHorz}px;font-size:${styling.fontSize}px;font-weight:${styling.fontWeight};text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide:all;">${text}</a>
     `}
     </div>
     {"\n"}
 {`<!-- END BUTTON -->`}
 {"\n"}
                 </td>
               </tr>
             </table>
           </td>
         </tr>
       </table>


}else if(title=="image"){
 return <table  width="100%" border="0" cellspacing="0" cellpadding="0" >
 <tr width="100%">
         <td  align={styling.imageAlignment}  width={"100%"}>
         {/* style={{marginTop:`${style.marginTop}px`,marginBottom:`${style.marginBottom}px`,marginLeft:`${style.marginLeft}px`,marginRight:`${style.marginRight}px`,}} */}
        <table  align={styling.imageAlignment} className={styling.textAlign2?styling.textAlign2:""}  style={{paddingTop:`${styling.marginTop}px`,paddingBottom:`${styling.marginBottom}px`,paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px`}}  border="0" cellspacing="0" cellpadding="0" >
    <tr width="100%">              
    <td width={"100%"} valign='middle' align='center' >
       <Img width={styling.width} alt={alt} id={`mc${id}`} editable={"true"} border="0" style={{...check(styling,title),width:styling.width}} src={src}/>
                   </td>  
       </tr>
        </table>
         </td>
       </tr>
     </table>
 }
 else if(title=="link-image"){
     return <table  width="100%" border="0" cellspacing="0" cellpadding="0" >
     <tr width="100%">
             <td  align={styling.imageAlignment}  width={"100%"}>
             {/* style={{marginTop:`${style.marginTop}px`,marginBottom:`${style.marginBottom}px`,marginLeft:`${style.marginLeft}px`,marginRight:`${style.marginRight}px`,}} */}
            <table  align={styling.imageAlignment} className={styling.textAlign2?styling.textAlign2:""}  style={{paddingTop:`${styling.marginTop}px`,paddingBottom:`${styling.marginBottom}px`,paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px`}}  border="0" cellspacing="0" cellpadding="0" >
        <tr width="100%">              
        <td width={"100%"} valign='middle' align='center' >
         <a href={styling.href}>
           <Img width={styling.width} alt={alt} id={`mc${id}`} editable={"true"} border="0" style={{...check(styling,title),width:styling.width}} src={src}/>
         </a>
                       </td>  
           </tr>
            </table>
             </td>
           </tr>
         </table>
     }
 else if(title=="hr"){
   return  <Section style={{margin:"0px auto",paddingBottom:`${styling.marginBottom}px`,paddingTop:`${styling.marginTop}px`,paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px !important`,}}>
   <Hr height={styling.height} color={styling.color} style={{width:styling.width,borderWidth:"0px",textAlign:styling.containerAlignment,borderColor:"transparent",margin:styling.containerAlignment=="center"?"auto":styling.containerAlignment=="right"?
  "0px 0px 0px auto":"0px auto 0px 0px",height:`${styling.height}px`,borderRadius:`${styling.borderRadius}px`}}/>
   
   </Section>
 }
 else if(title=="col-container"){
   return <>
   {"\n"}
   {`<!--${styling.href?styling.href:"COLUMN CONTAINER"} -->`}
   {"\n"}
       <Section   width="100%"  border="0" cellspacing="0" cellpadding="0" >
      <Row width="100%">
       <Column style={{paddingBottom:`${styling.marginBottom}px`,
         paddingTop:`${styling.marginTop}px`,paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px`,}}  width={"100%"} valign='middle' align={styling.containerAlignment}>
      {/* <table align={style.containerAlignment} width={style.width} style={{background:style.backgroundColor}}  data-id="__1017-email-section" role="presentation" cellSpacing="0" cellPadding="0" border="0" >  */}
      <table align={styling.containerAlignment} bgcolor={styling.backgroundfallback}  width={styling.width} data-id="__1017-email-section" role="presentation" cellSpacing="0" cellPadding="0" border="0" > 
     <tr >
     <td height={styling.height}  background={styling.backgroundImage?styling.backgroundImage:""} bgcolor={styling.backgroundfallback} valign='middle' style={check(styling,"col-container")}>
    {styling.backgroundImage?`<!--[if gte mso 9]>
<v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block; width: 480pt; height: ${styling.height>20?styling.height:350 * 0.75}pt;" src=${styling.backgroundImage} /> 
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block;position: absolute; width: 480pt;height: ${styling.height>20?styling.height:350 * 0.75}pt;">
<v:fill  color=${"#02baf7"}  type="frame" />
<v:textbox inset="0,0,0,0">
<![endif]-->
<div>
`:""}
<table  dir={styling.flexDirection} style={{direction:styling.flexDirection,height:"100%"}}   width="100%"  border="0" cellspacing="0" cellpadding="0" >
<tr width="100%" style={{height:"100%"}}>
{content.map(({title,text,style,src,content,alt,id},number)=>{
if(title== "col-container"){
 return <>
 {"\n"}
 {`<!-- SUB COLUMN -->`}
 {"\n"}
 {/* <Column width={imagify(style.width)} bgcolor={style.backgroundfallback} background={style.backgroundImage?style.backgroundImage:""} valign={style.verticalAlignment} align={style.containerAlignment}  style={{...check(style,"col2-container"),background:style.backgroundColor,border:hover==`${newId}${id}`?"3px dotted blue":"1px dashed #8AB7EC",width:style.width,position:"relative",backgroundColor:"aqa",height:`${style.height}px`}}> */}
 <Column width={imagify(style.width)}  bgcolor={style.backgroundfallback} background={style.backgroundImage?style.backgroundImage:""}  className={styling.responsive?"td":""} align='center' style={{...check(style,"col2-container"),padding:"0px"}}>
 {/* <Column className='td' valign={style.verticalAlignment} align={style.containerAlignment} style={{background:style.backgroundColor,width:style.width,backgroundColor:style.backgroundfallback,fontSize:"0pt","mso-line-height-rule":"exactly",lineHeight:"0pt",padding:"0", margin:"0", fontWeight:"normal",}}> */}
                 {/* <div  style={{...style,minWidth:"50px",minHeight:"10px",paddingTop:`${style.paddingTop}px`,paddingBottom:`${style.paddingBottom}px`,paddingLeft:`${style.paddingLeft}px`,paddingRight:`${style.paddingRight}px`}}> */}
<table align={style.containerAlignment} className={style.childrenAlignment=="right"?"t-right-2":style.childrenAlignment=="left"?"t-left-2":"center-float"} style={{paddingTop:`${style.paddingTop}px`,paddingBottom:`${style.paddingBottom}px`,paddingLeft:`${style.paddingLeft}px`,paddingRight:`${style.paddingRight}px`}}  border="0" cellspacing="0" cellpadding="0" >
<tr width="100%" className='m-center'>
{/* style={{...style,minWidth:"100%",minHeight:"10px",paddingTop:`${style.paddingTop}px`,paddingBottom:`${style.paddingBottom}px`,paddingLeft:`${style.paddingLeft}px`,paddingRight:`${style.paddingRight}px`}} */}
   {content.map(({title,text,src,style,id:newerId,alt})=>{
                    if(title=="text" || title=="paragraph"){
                     return(
                       <Column align='center' class="mobile-td" >
                         <table>
                           <tr>
                           <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                             <td className={styling.textAlign2?styling.textAlign2:""}  style={containerChildStyle(style,"text")}>
                               <multiline ><div id={`mc${index}${newerId}`}>{text}</div></multiline>
                             </td>
                             <td className='m-hide' width={"4px"} style={{fontSize:"4px",lineHeight:"4px",width:"4px"}}>&nbsp;</td>
                           </tr>
                         </table>
                     </Column>  
                     )
                   }else if(title=="html"){
                       return (
                         <Column align='center' class="mobile-td">
                 <JsxParser  renderUnrecognized={true} renderInWrapper={false} allowUnknownElements={true} disableFragments autoCloseVoidElements componentsOnly={false }  components={{Button, Column, Img, Section, Container, Text, Row, Hr, Heading,Font,Link,Spacer}} jsx={`${text}`} />
                         </Column>
                       )
                   }
                   if(title=="link"){
                     return(
                       <Column align='center' class="mobile-td" >
                       <table>
                         <tr>
                         <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                           <td className={styling.textAlign2?styling.textAlign2:""}  style={containerChildStyle(style,"text")}>
                              <multiline ><a id={`mc${index}${newerId}`} href={style.href} style={{ color:style.color,textDecoration:style.textDecoration}}></a><span style={{ color:style.color,textDecoration:"none"}}><Interweave content={text}/></span></multiline>
                           </td>
                         <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                         </tr>
                       </table>
                   </Column> 
                     )
                   }
                   else if(title =="image"){
                     return(
                       <Column align={style.imageAlignment}  class="mobile-td"  >
                       <table >
                       <tr>
                       <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                       <td >
                       <Img width={imagify(style.width)} border="0" id={`mc${index}${newerId}`} editable={"true"} src={src}  alt={alt} style={check(style,"col-col-image")}/>                                         
                       </td>
                        <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                       </tr>
                       </table>
                         
                     </Column>
                         )
                         }
                         else if(title =="link-image"){
                           return(
                             <Column align={style.imageAlignment}  class="mobile-td" >
                             <table >
                             <tr>
                             <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                             <td>
                             <Img width={imagify(style.width)} src={src} id={`mc${index}${newerId}`} editable="true" border="0" alt={alt} style={check(style,"col-col-image")}/>                                         
                             </td>
                              <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                             </tr>
                             </table>      
                           </Column>
                               )
                               }else if(title=="button"){
                           return (

                             <Column  align={style.containerAlignment} className='mobile-td'>
                                {"\n"}
 {`<!--BUTTON -->`}
 {"\n"}
<table align={style.containerAlignment}   border="0" cellspacing="0" cellpadding="0" class="centr" >
<tr>
             <td width={"100%"}   align={style.containerAlignment}  >
           <table className={style.textAlign2?style.textAlign2:""}  border="0" cellspacing="0" cellpadding="0" style={{paddingLeft:`${style.marginLeft}px`,paddingRight:`${style.marginRight}px`,paddingBottom:`${style.marginBottom}px`,paddingTop:`${style.marginTop}px`}} >
         <tr width="100%">
                 <td width={style.width.includes("%")?calcRowBtn(style.width,style.width):style.width}  style={{maxWidth:"650px",fontFamily:style.fontFamily,color:style.color,fontSize:`${style.fontSize}px`,lineHeight:`${style.fontSize}px`,}}>
                 {"\n"}
 {`<!-- BUTTON -->`}
 {"\n"}
                  <div > 
                  {`<!--[if mso]>
       <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${style.href}" style="height:38px;v-text-anchor:middle;width:${style.width.includes("%")?calcRowBtn(style.width,style.width):`${style.width}`};" arcsize="${(style.borderBottomLeftRadius/style.width)*100}%" strokecolor="${style.borderWidth<1?style.backgroundColor:style.borderColor}" fillcolor="${style.backgroundColor}">
         <w:anchorlock/>
         <center style="color:${style.color};font-family:${style.fontFamily};font-size:${style.fontSize};font-weight:${style.fontWeight};">${text}</center>
       </v:roundrect>
     <![endif]--><a href="${style.href}" id="mc${index}${newerId}" 
     style="letter-spacing:${style.letterSpacing}px;lineHeight:${style.fontSize}px;font-weight:${style.fontWeight};text-transform:${style.textTransform};background-color:${style.backgroundColor};border:${style.borderWidth}px ${style.borderColor} ${style.borderStyle};border-radius:${style.borderBottomLeftRadius}px;color:${style.color};display:block;font-family:${style.fontFamily};padding:${style.paddingVert}px ${style.paddingHorz}px;font-size:${style.fontSize}px;font-weight:${style.fontWeight};text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide:all;">${text}</a>
     `}
     </div>
     {"\n"}
 {`<!-- END BUTTON -->`}
 {"\n"}
                 </td>
               </tr>
             </table>
           </td>
         </tr>
     </table>   
     {"\n"}
 {`<!-- END BUTTON -->`}
 {"\n"}

                             </Column>
                           )
                         }
                         else if (title=="spacer"){
                           return <Column width={style.width} height={style.height}>{`&nbsp;`}</Column>
                         }
                 })}
                 </tr>
                </table>
</Column>
 {"\n"}
 {`<!-- END SUB COLUMN -->`}
 {"\n"}
 </>
} else if(title=="row-container"){
 return <>
 {"\n"}
 {`<!--SUB COLUMN -->`}
 {"\n"}
  <Column width={imagify(style.width)}  bgcolor={style.backgroundfallback} background={style.backgroundImage?style.backgroundImage:""}  className={styling.responsive?"td":""} align='center' style={{...check(style,"col2-container"),padding:"0px"}}>
  {style.backgroundImage?`\n<!--[if gte mso 9]>
<v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block; width: 480pt; height: ${style.height>20?style.height:350 * 0.75}pt;" src=${style.backgroundImage} /> 
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block;position: absolute; width: 480pt;height: ${styling.height>20?styling.height:350 * 0.75}pt;">
<v:fill  opacity="0%" color=${"#02baf7"}  type="frame" />
<v:textbox inset="0,0,0,0">
<![endif]-->
<div>
`:""}
<table width="100%" border="0" cellspacing="0" cellpadding="0" style={{paddingTop:`${style.paddingTop}px`,paddingBottom:`${style.paddingBottom}px`,paddingLeft:`${style.paddingLeft}px`,paddingRight:`${style.paddingRight}px`}}  >

<tr width="100%">
          <td height={style.height} valign={style.verticalAlignment}   width={"100%"} align={style.containerAlignment} style={{fontSize:"0pt","mso-line-height-rule":"exactly",lineHeight:"0pt",padding:"0", margin:"0", fontWeight:"normal",height:`${style.height}px`,}}   > 

<table width="100%" border="0" cellspacing="0" cellpadding="0">
     
     {content.map(({text,style:styles,src,title,alt,id})=>{
       if(title=="text" || title=="paragraph"){
           return<tr width="100%">
            <td width={"100%"} align={styles.containerAlignment}>
             <table style={{paddingTop:`${styles.marginTop}px`,paddingBottom:`${styles.marginBottom}px`,paddingLeft:`${styles.marginLeft}px`,paddingRight:`${styles.marginRight}px`}}  align={styles.containerAlignment} width={styles.width} border="0" cellspacing="0" cellpadding="0">
               <tr width="100%">
               <td className={styles.textAlign2?styles.textAlign2:""} align={styles.containerAlignment} style={check(styles,"ind-text")}>  
             <multiline><div id={`mc${index}${id}`} class="link2">{text}</div></multiline>
                        </td>
               </tr>
             </table>
            </td>
                        </tr>
           }else if(title=="spacer"){
             return <tr>
             <td width={styles.width} height={styles.height}>
             {'&nbsp;'}
             </td>
                         </tr>
             }
         else if(title=="link"){
           return <tr>
            <td width={"100%"}>
             <table style={{paddingTop:`${styles.marginTop}px`,paddingBottom:`${styles.marginBottom}px`,paddingLeft:`${styles.marginLeft}px`,paddingRight:`${styles.marginRight}px`}}  align={styles.containerAlignment} width={styles.width} border="0" cellspacing="0" cellpadding="0">
               <tr width="100%">
               <td className={styles.textAlign2?styles.textAlign2:""} align={styles.containerAlignment} style={check(styles,"ind-text")}>  
             <multiline><a href={styles.href} id={`mc${index}${id}`} style={{ color:styles.color,textDecoration:styles.textDecoration}} ><span class="link2" style={{ color:styles.color,textDecoration:"none"}}><Interweave content={text}/></span></a></multiline>
                        </td>
               </tr>
             </table>
            </td>
                        </tr>
           }else if(title=="html"){
             return<tr width="100%">
            <td width={"100%"} align={styles.containerAlignment} >
             {/* <table width={"100%"}  align={styles.containerAlignment} className={styles.textAlign2=="m-center"?"center m-center":styles.textAlign2=="m-right"?"right":"m-left"} style={{paddingTop:`${styles.marginTop}px`,paddingBottom:`${styles.marginBottom}px`,paddingLeft:`${styles.marginLeft}px`,paddingRight:`${styles.marginRight}px`}} border="0" cellspacing="0" cellpadding="0">
               <tr width="100%">
               <td align="center" id={`mc${index}${id}`} style={check(styles,"ind-text")}>    */}
                 <JsxParser  renderUnrecognized={true} renderInWrapper={false} allowUnknownElements={true} disableFragments autoCloseVoidElements componentsOnly={false }  components={{Button, Column, Img, Section, Container, Text, Row, Hr, Heading,Font,Link,Spacer}} jsx={`${text}`} />
                  {/* </td>
                </tr>
              </table> */}
             </td>
                         </tr>
             }else if(title=="image"){
               return <tr align={styles.imageAlignment}  width="100%">
               <td  align={styles.imageAlignment}>
                <table className={styles.textAlign2?styles.textAlign2:""} align={styles.imageAlignment} border="0" cellPadding="0" cellspacing="0">
                  <tr>
                    <td align='center' width={"100%"} style={{fontSize:`${style.fontSize}px`,lineHeight:`${style.fontSize}px`,color:style.color,fontFamily:style.fontFamily,fontWeight:style.fontWeight,padding:"0px"}} >
                <Img alt={alt} width={imagify(styles.width)} border="0" id={`mc${index}${id}`} editable="true"  style={check(styles,"row-image")} src={src}/>   
                    </td>
                  </tr>
                </table>
          </td>
          </tr>
  
               
          }
          else if(title=="link-image"){
           return  <tr   width="100%">
            <td  align={styles.imageAlignment} >
             <table className={styles.textAlign2?styles.textAlign2:""} align={styles.imageAlignment} border="0" cellPadding="0" cellspacing="0">
               <tr>
                 <td align='center' width={"100%"} style={{fontSize:`${style.fontSize}px`,lineHeight:`${style.fontSize}px`,color:style.color,fontFamily:style.fontFamily,fontWeight:style.fontWeight}} >
             <a href={styles.href} style={{color:style.color,textDecoration:"none"}}>
             <Img alt={alt} width={imagify(styles.width)} border="0" id={`mc${index}${id}`} editable="true"  style={check(styles,"row-image")} src={src}/>   
             </a>

                 </td>
               </tr>
             </table>
       </td>
       </tr>

           
      }else if(title=="hr"){
        return <tr width="100%">
              <td  align={styles.containerAlignment}  >
               <table  className={styles.textAlign2?styles.textAlign2:"center-float"} >
                 <tr width={"100%"}>
                   <td width={styles.width} align={styles.containerAlignment} style={{paddingTop:`${styles.marginTop}px`,paddingBottom:`${styles.marginBottom}px`,paddingRight:`${styles.marginRight}px`,paddingLeft:`${styles.marginLeft}px`}}  >
                 <Hr style={{...check(styles,"hr")}} color={styles.color}/>
                   </td></tr>
               </table>
               </td>   
         </tr>
         
         
         // </Section>
       }else if(title=="button"){
         return <tr>
             <td width={"100%"}   align={styles.containerAlignment}  >
           <table className={styles.textAlign2?styles.textAlign2:""}  border="0" cellspacing="0" cellpadding="0" style={{paddingLeft:`${styles.marginLeft}px`,paddingRight:`${styles.marginRight}px`,paddingBottom:`${styles.marginBottom}px`,paddingTop:`${styles.marginTop}px`}} >
         <tr width="100%">
                 <td width={styles.width.includes("%")?calcRowBtn(styles.width,style.width):styles.width}  style={{maxWidth:"650px",fontFamily:styles.fontFamily,color:styles.color,fontSize:`${styles.fontSize}px`,lineHeight:`${styles.fontSize}px`,}}>
                 {"\n"}
 {`<!-- BUTTON -->`}
 {"\n"}
                  <div > 
                  {`<!--[if mso]>
       <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${styles.href}" style="height:38px;v-text-anchor:middle;width:${styles.width.includes("%")?calcRowBtn(styles.width,style.width):`${styles.width}`};" arcsize="${(styles.borderBottomLeftRadius/style.width)*100}%" strokecolor="${styles.borderWidth<1?styles.backgroundColor:styles.borderColor}" fillcolor="${styles.backgroundColor}">
         <w:anchorlock/>
         <center style="color:${styles.color};font-family:${styles.fontFamily};font-size:${styles.fontSize};font-weight:${styles.fontWeight};">${text}</center>
       </v:roundrect>
     <![endif]--><a href="${styles.href}" id="mc${index}${id}" 
     style="letter-spacing:${styles.letterSpacing}px;lineHeight:${styles.fontSize}px;font-weight:${styles.fontWeight};text-transform:${styles.textTransform};background-color:${styles.backgroundColor};border:${styles.borderWidth}px ${styles.borderColor} ${styles.borderStyle};border-radius:${styles.borderBottomLeftRadius}px;color:${styles.color};display:block;font-family:${styles.fontFamily};padding:${styles.paddingVert}px ${styles.paddingHorz}px;font-size:${styles.fontSize}px;font-weight:${styles.fontWeight};text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide:all;">${text}</a>
     `}
     </div>
     {"\n"}
 {`<!-- END BUTTON -->`}
 {"\n"}
                 </td>
               </tr>
             </table>
           </td>
         </tr>
   
       }
     })}
   
         </table>
         </td>
         </tr>
         </table>
         {style.backgroundImage?`
    </div>
 <!--[if gte mso 9]>
 </v:textbox>
 </v:fill>
 </v:rect>
 </v:image>
 <![endif]-->`:""}

 </Column>
 {"\n"}
 {`<!-- SUB COLUMN -->`}
 {"\n"}
 </>


}
else if(title=="spacer"){
 return <>
 {"\n"}
 {`<!-- COLUMN SPACER -->`}
 {"\n"}
  <Column className='td' style={{width:style.width,maxWidth:style.width,height:`${style.height}px`,fontSize:`${style.height}px`,lineHeight:`${style.height}px`}} height={imagify(style.height)} width={style.width}>
 {'&nbsp;'}
</Column>
 {"\n"}
 {`<!--END COLUMN SPACER -->`}
 {"\n"}
 </>
}

})}
</tr>
</table>     
    {styling.backgroundImage?`
    </div>
 <!--[if gte mso 9]>
 </v:textbox>
 </v:fill>
 </v:rect>
 </v:image>
 <![endif]-->`:""}
     </td>
     </tr> 
     </table>
     </Column>
    </Row>
         </Section>
         {"\n"}
         {`<!--END ${styling.href?styling.href:"COLUMN CONTAINER"} -->`}
         {"\n"}
         </>
     
 }
 // end of col-container
 // end of col-container
 // end of col-container
 // end of col-container
 // end of col-container
 else if(title=="row-container"){  
   return  <>
   {"\n"}
   {`<!-- START ${styling.href?styling.href:"ROW Container"} -->`}
   {"\n"}
   
   
   <table   width="100%"  border="0" cellspacing="0" cellpadding="0" >
    
   <tr width="100%">
           <td style={{paddingBottom:`${styling.marginBottom}px`,
      paddingTop:`${styling.marginTop}px`,paddingLeft:`${styling.marginLeft}px`,paddingRight:`${styling.marginRight}px`,}}  width={"100%"} valign='middle' align={styling.containerAlignment}>
   {/* <table align={style.containerAlignment} width={style.width} style={{background:style.backgroundColor}}  data-id="__1017-email-section" role="presentation" cellSpacing="0" cellPadding="0" border="0" >  */}
   <table align={styling.containerAlignment}  width={styling.width} data-id="__1017-email-section" role="presentation" cellSpacing="0" cellPadding="0" border="0" > 
  <tr >
  <td width={"100%"} background={styling.backgroundImage?styling.backgroundImage:""} bgcolor={styling.backgroundfallback} valign='middle' style={check(styling,"col-container")}>
 
{styling.backgroundImage?`<!--[if gte mso 9]>
<v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block; width: 480pt; height: ${styling.height * 0.75}pt;" src=${styling.backgroundImage} /> 
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block;position: absolute; width: 480pt;height: ${styling.height * 0.75}pt;">
<v:fill  opacity="0%" color=${"#02baf7"}  type="tile" />
<v:textbox inset="0,0,0,0">
<![endif]-->
<div>
`:""}
             <table width={"100%"} align='center' border="0" cellspacing="0" cellpadding="0" > 
             {content.map(({title,text,style,src,content,alt,id})=>{
     if(title=="text"){
       return <tr><td align='center' width={"100%"}>
        <table width={imagify(style.width)} style={{width:style.width,maxWidth:style.width}} role='presentation' align={style.containerAlignment}  border="0" cellspacing="0" cellpadding="0" > 
        <tr width="100%">
         <td style={check(style,"ind-text")}  className={style.textAlign2?style.textAlign2:""} valign={style.verticalAlignment} align={"center"}>
        <multiline><div id={`mc${index}${id}`} class="link2">{text}</div></multiline>
         </td>
        </tr>
           </table>
             </td></tr>
       }
       if(title=="link"){
         return <tr><td align='center' width={"100%"}>
          <table width={imagify(style.width)} style={{width:style.width,maxWidth:style.width}} role='presentation' align={style.containerAlignment} border="0" cellspacing="0" cellpadding="0" > 
          <tr width="100%">
           <td className={style.textAlign2?style.textAlign2:""} style={check(style,"ind-text")} valign={style.verticalAlignment} align={"center"}>
        <multiline><a href={style.href} id={`mc${index}${id}`} style={{color:style.color,textDecoration:style.textDecoration}}><span class="link2" style={{color:style.color,textDecoration:"none",}}>{text}</span></a></multiline>
           </td>
          </tr>
             </table>
               </td></tr>
         }else if (title=="image"){
           return  <tr align={style.imageAlignment}>
             <td  align={style.imageAlignment}>
             
   <table width={imagify(style.width)} className={style.textAlign2?style.textAlign2:""}>
     <tr>
       <td className={style.textAlign2?style.textAlign2:""}   style={{width:"100%",border:`${style.borderWidth}px ${style.borderStyle} ${style.borderColor}`,padding:"0px"}} >

               <Img  border="0" editable="true" id={`mc${index}${id}`} width={"100%"} alt={alt}  style={{width:"100%",borderRadius:`${style.borderRadius}px`}} src={src}/>
       </td>
     </tr>
   </table>     
               </td></tr>
         }else if (title=="link-image"){
           return <tr align={style.imageAlignment}>
           <td>        
 <table width={imagify(style.width)} className={style.textAlign2?style.textAlign2:""}>
   <tr>
     <td   style={{width:"100%",border:`${style.borderWidth}px ${style.borderStyle} ${style.borderColor}`,padding:"0px"}} >
<a href={style.href}>
             <Img  border="0" editable="true" id={`mc${index}${id}`} width={"100%"} alt={alt}  style={{width:"100%",borderRadius:`${style.borderRadius}px`}} src={src}/>

</a>
     </td>
   </tr>
 </table>
               
             </td></tr>
         }else if(title=="paragraph"){
         return <tr><td align='center' width={"100%"}>
         <table width={imagify(style.width)} style={{width:style.width,maxWidth:style.width}} role='presentation'    border="0" cellspacing="0" cellpadding="0" > 
         <tr width="100%">
          <td className={style.textAlign2?style.textAlign2:""} align={style.containerAlignment}  style={check(style,"ind-text")} valign={style.verticalAlignment}>
         <multiline><div id={`mc${index}${id}`} class="link2">{text}</div></multiline>
          </td>
         </tr>
            </table>
              </td></tr>
  
          }
          else if(title=="html"){
           return <tr><td align={"center"} width={"100%"}>
                        {/* <Interweave content={text}/> */}
                 <JsxParser  renderUnrecognized={true} renderInWrapper={false} allowUnknownElements={true} disableFragments autoCloseVoidElements componentsOnly={false }  components={{Button, Column, Img, Section, Container, Text, Row, Hr, Heading,Font,Link,Spacer}} jsx={`${text}`} />


                </td></tr>
    
            }else if(title=="hr"){
           return <tr width="100%">
           <td  align={style.containerAlignment} class="text-header" >
            <table width={style.width} align='center' border="0" cellspacing="0" cellpadding="0">
              <tr width={"100%"}>
                <td width={"100%"}   >
              <Hr style={check(style,"hr")} color={style.color}/>
                </td>
                </tr>
            </table>
            </td>   
      </tr>
         }
         else if(title=="button"){
           return ( <tr>
             <td align={style.containerAlignment} width={"100%"}  class="text-header" >
           <table className={style.textAlign2?style.textAlign2:""} border="0" cellspacing="0" cellpadding="0" >
           <tr width="100%">
                 <td width={style.width.includes("%")?calcRowBtn(style.width,style.width):style.width}  style={{fontFamily:style.fontFamily,color:style.color,fontSize:`${style.fontSize}px`,lineHeight:`${style.fontSize}px`,maxWidth:"650px",paddingLeft:`${style.marginLeft}px`,paddingRight:`${style.marginRight}px`,paddingBottom:`${style.marginBottom}px`,paddingTop:`${style.marginTop}px`}} >
                 {"\n"}
 {`<!--BUTTON -->`}
 {"\n"}
                  <div > 
                  {`<!--[if mso]>
           <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${style.href}" style="height:38px;v-text-anchor:middle;width:${style.width.includes("%")?calcRowBtn(style.width,style.width):`${style.width}`};" arcsize="${(style.borderBottomLeftRadius/style.width)*100}%" strokecolor="${style.borderWidth<1?style.backgroundColor:style.borderColor}" fillcolor="${style.backgroundColor}">
           <w:anchorlock/>
           <center style="color:${style.color};font-family:${style.fontFamily};font-size:${style.fontSize};font-weight:${style.fontWeight};">${text}</center>
           </v:roundrect>
           <![endif]--><a href="${style.href}" id="mc${index}${id}"
           style="letter-spacing:${style.letterSpacing}px;lineHeight:${style.fontSize}px;font-weight:${style.fontWeight};text-transform:${style.textTransform};background-color:${style.backgroundColor};border:${style.borderWidth}px ${style.borderColor} ${style.borderStyle};border-radius:${style.borderBottomLeftRadius}px;color:${style.color};display:block;font-family:${style.fontFamily};padding:${style.paddingVert}px ${style.paddingHorz}px;font-size:${style.fontSize}px;font-weight:${style.fontWeight};text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide:all;">${text}</a>
           `}
           </div>
           {"\n"}
 {`<!-- END BUTTON -->`}
 {"\n"}
                 </td>
               </tr>
             </table>
           </td>
           </tr>
               )
       // return <tr  ><td style={{border:"2px solid red"}}   valign={text=="btn"?"top":"top"}>{text}</td></tr>
   }else if(title== "col-container"){
     return (
       <tr>
       {/* <td  align={"center"} width={style.width} style={{width:"80%",background:"red"}} > */}
   <td width="100%"  valign={style.verticalAlignment} align={style.containerAlignment}  style={{...check(style,"col2-container"),height:`${style.height}px`}}>

       <table className={style.childrenAlignment=="right"?"t-right-2":style.childrenAlignment=="left"?"t-left-2":"center-float"}  border="0" cellspacing="0" cellpadding="0"  align={style.containerAlignment} >
 <tr className='m-center'>
 
 {content.map(({title,text,src,style,id:newerId,alt})=>{
                        if(title=="text" || title=="paragraph"){
                         return(
                         <td className='mobile-td'>
                           <table  align="center" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                           <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                             <td style={check(style,"ind-text")} valign={style.verticalAlignment} align={style.containerAlignment}>
                                  <multiline><div  id={`mc${index}${newerId}`} class="link2">{text}</div></multiline>
                           </td>
                           <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                           </tr>
                           </table>
                           </td>
                         )
                       }
                       if(title=="link"){
                         return(
                           <td className='mobile-td'>
                           <table  align="center" border="0" cellspacing="0" cellpadding="0">
                            <tr>
             <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                             <td style={check(style,"ind-text")} valign={style.verticalAlignment} align={style.containerAlignment}>
        <multiline><a href={style.href} id={`mc${index}${newerId}`} target="_blank" class="link2" style={{color:style.color,textDecoration:style.textDecoration}}><span class="link2" style={{color:style.color,textDecoration:"none",}}>{text}</span></a></multiline>
             </td>
             <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
             </tr>
             </table>
                         </td>
                        
                           
                           
                        
                         )
                       }else if(title=="html"){
                       return(
                         <td className='td'  width={style.width} align='center' style={{width:style.width,maxWidth:style.width}} >
                         <table  cellpadding="0" cellspacing="0" role="presentation" class="center" align={style.containerAlignment} width={"100%"}>
                          <tr><td id={`mc${index}${newerId}`} align='center'  className={style.textAlign2?style.textAlign2:""} style={check(style,"ind-text")} valign={style.verticalAlignment} >
                     <JsxParser  renderUnrecognized={true} renderInWrapper={false} allowUnknownElements={true} disableFragments autoCloseVoidElements componentsOnly={false }  components={{Button, Column, Img, Section, Container, Text, Row, Hr, Heading,Font,Link,Spacer}} jsx={`${text}`} />
                           
                        </td>
                        </tr>
                       </table>
                       </td>
                         
                      
                       )
                     }
                     else if(title =="image"){
                       return(
                         <Column   align={style.imageAlignment} className='mobile-td'>
                           <table width={"100%"} border="0" cellspacing="0" cellpadding="0">
                             <tr>
             <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>

                               <td>
                         <Img width={imagify(style.width)} id={`mc${index}${newerId}`} editable="true" border="0" src={src} alt={alt} style={{...style,marginTop:`${style.marginTop}px`,marginLeft:`${style.marginLeft}px`,marginRight:`${style.marginRight}px`,marginBottom:`${style.marginBottom}px`}}/>                                          
                               </td>
             <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>

                             </tr>
                             </table>
                       </Column> 
                           )
                           }
                           else if(title =="link-image"){
                             return(
                               <Column   align={style.imageAlignment} className='mobile-td'>
                               <table border="0" cellspacing="0" cellpadding="0">
                                 <tr>
             <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                                   <td>
                                   <a href={style.href} style={{color:"white"}}  >

<Img width={imagify(style.width)} editable="true" id={`mc${index}${newerId}`} border="0" src={src} alt={'facebook'} style={{...style,marginTop:`${style.marginTop}px`,marginLeft:`${style.marginLeft}px`,marginRight:`${style.marginRight}px`,marginBottom:`${style.marginBottom}px`}}/>                                          
 </a>   </td>
 <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>

                                 </tr>
                                 </table>
                           </Column>
                                 )
                                 }else if(title=="button"){
                               return (
                                 <td align={style.containerAlignment} class="mobile-td" >
           <table align='center' border="0" cellspacing="0" cellpadding="0" >
           <tr width="100%">
                 <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>
                 <td width={style.width.includes("%")?calcRowBtn(style.width,style.width):style.width}  style={{fontFamily:style.fontFamily,color:style.color,fontSize:`${style.fontSize}px`,lineHeight:`${style.fontSize}px`,maxWidth:"650px",paddingLeft:`${style.marginLeft}px`,paddingRight:`${style.marginRight}px`,paddingBottom:`${style.marginBottom}px`,paddingTop:`${style.marginTop}px`}} >
                 {"\n"}
                 {`<!--BUTTON -->`}
                 {"\n"}
                  <div > 
                  {`<!--[if mso]>
           <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${style.href}" style="height:38px;v-text-anchor:middle;width:${style.width.includes("%")?calcRowBtn(style.width,style.width):`${style.width}`};" arcsize="${(style.borderBottomLeftRadius/style.width)*100}%" strokecolor="${style.borderWidth<1?style.backgroundColor:style.borderColor}" fillcolor="${style.backgroundColor}">
           <w:anchorlock/>
           <center style="color:${style.color};font-family:${style.fontFamily};font-size:${style.fontSize};font-weight:${style.fontWeight};">${text}</center>
           </v:roundrect>
           <![endif]--><a href="${style.href}" id="mc${index}${newerId}"
           style="letter-spacing:${style.letterSpacing}px;lineHeight:${style.fontSize}px;font-weight:${style.fontWeight};text-transform:${style.textTransform};background-color:${style.backgroundColor};border:${style.borderWidth}px ${style.borderColor} ${style.borderStyle};border-radius:${style.borderBottomLeftRadius}px;color:${style.color};display:block;font-family:${style.fontFamily};padding:${style.paddingVert}px ${style.paddingHorz}px;font-size:${style.fontSize}px;font-weight:${style.fontWeight};text-align:center;text-decoration:none;-webkit-text-size-adjust:none;mso-hide:all;">${text}</a>
           `}
           </div>
           {"\n"}
 {`<!-- END BUTTON -->`}
 {"\n"}
                 </td>
                 <td className='m-hide' width={"10px"} style={{fontSize:"10px",lineHeight:"10px",width:"10px"}}>&nbsp;</td>

               </tr>
             </table>
           </td>
                               )
                             }else if(title=="spacer"){
return <td align='center' class="mobile-td" height={imagify(style.height)} width={style.width} style={{width:style.width,maxWidth:style.width,height:`${style.height}px`}}>
{'&nbsp;'}
</td>
                             }
                     })}
 </tr>
</table>  
 </td>
 </tr>
     )
   }
   else if(title== "row-container"){
     return (
       <tr >
       <td class="td" align={style.containerAlignment}>
<table  width={style.width} border="0" cellspacing="0" cellpadding="0"  align={style.containerAlignment} style={check(style,"row-container")}>
<tr>
         <td height={style.height} valign={style.verticalAlignment}  >
           <table width={"100%"} border="0" cellspacing="0" cellpadding="0" >          
       {content.map(({title,text,src,style,id:newerId,alt})=>{
                       if(title=="text" || title=="paragraph"){
                         return <tr width="100%">
            <td width={"100%"}>
             <table style={{paddingLeft:`${style.marginLeft}px`,paddingRight:`${style.marginRight}px`}}  align={style.containerAlignment} width={style.width} border="0" cellspacing="0" cellpadding="0">
               <tr width="100%">
               <td width={"100%"} style={check(style,"ind-text")}>  
             <multiline><div class="link2" id={`mc${index}${newerId}`}>{text}</div></multiline>
                        </td>
               </tr>
             </table>
            </td>
                        </tr> 
                            }
                            if(title=="link"){
                             return <tr width="100%">
                <td width={"100%"}>
                 <table style={{paddingTop:`${style.marginTop}px`,paddingBottom:`${style.marginBottom}px`,paddingLeft:`${style.marginLeft}px`,paddingRight:`${style.marginRight}px`}}  align='center' width={style.width} border="0" cellspacing="0" cellpadding="0">
                   <tr width="100%">
                   <td width={"100%"} style={check(style,"ind-text")}>  
                 <multiline><a href={style.href} id={`mc${index}${newerId}`} target="_blank" class="link2" style={{ color:style.color,textDecoration:style.textDecoration}}><span class="link2" style={{ color:style.color,textDecoration:"none"}}><Interweave content={text}/></span></a></multiline>
                            </td>
                   </tr>
                 </table>
                </td>
                            </tr> 
                                } else if(title=="html"){
                       return  <tr><td align={style.containerAlignment}  style={{...style,borderRadius:`${style.borderRadius}px`,lineHeight:`${style.lineHeight}px`,fontSize:`${style.fontSize}px`,paddingTop:`${style.paddingTop}px`,paddingBottom:`${style.paddingBottom}px`,paddingLeft:`${style.paddingLeft}px`,paddingRight:`${style.paddingRight}px`,marginTop:`${style.marginTop}px`,marginLeft:`${style.marginLeft}px`,marginRight:`${style.marginRight}px`,marginBottom:`${style.marginBottom}px`}} >
                                        <JsxParser  renderUnrecognized={true} renderInWrapper={false} allowUnknownElements={true} disableFragments autoCloseVoidElements componentsOnly={false }  components={{Button, Column, Img, Section, Container, Text, Row, Hr, Heading,Font,Link,Spacer}} jsx={`${text}`} />
                               </td></tr>   
                         }

                         else if(title =="image"){
                           return  <tr >
                           <td align={style.imageAlignment} style={{margin:"0 auto"}}  >
                             <Img  id={`mc${index}${newerId}`} editable="true" border="0" alt={alt} width={imagify(style.width)} style={check(style,"row-image")} src={src}/>
                                </td></tr>
                               }
                               else if(title =="link-image"){
                                 return  <tr >
                                 <td align={style.imageAlignment} style={{margin:"0 auto"}}  >
                                   <a href={style.href}>

                                   <Img  alt={alt} width={imagify(style.width)}  id={`mc${index}${newerId}`} editable="true" border="0" style={check(style,"row-image")} src={src}/>
                                   </a>
                                      </td></tr>
                                     }
                             
                             else if(title=="hr"){
                               return <tr width="100%">
                               <td  align={style.containerAlignment} class="text-header" >
                                <table width={style.width} align={style.containerAlignment}  border="0" cellspacing="0" cellpadding="0">
                                  <tr width={"100%"}>
                                    <td align={style.containerAlignment}  width={"40%"}   >
                                  <Hr style={check(style,"hr")} color={style.color}/>
                                    </td>
                                    </tr>
                                </table>
                                </td>   
                          </tr>
                             } 
                             
                             
                             else if(title=="button"){
                               return  <tr>
                               <td width="100%" class="text-header" >
                             <table align='center' width="100%" border="0" cellspacing="0" cellpadding="0" >
                             <tr width="100%">
                                   <td  style={{paddingLeft:`${style.marginLeft}px`,paddingRight:`${style.marginRight}px`,paddingBottom:`${style.marginBottom}px`,paddingTop:`${style.marginTop}px`}} align={style.containerAlignment}>
                                   {"\n"}
                                   {`<!--BUTTON -->`}
                                   {"\n"}
                                    <div > 
                                    {`<!--[if mso]>
                             <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href='${style.href}' style="height:38px;v-text-anchor:middle;width:${style.width.includes("%")?calcRowBtn(style.width,style.width):`${style.width}`};" arcsize="${(style.borderBottomLeftRadius/style.width)*100}%" strokecolor="${style.borderWidth<1?style.backgroundColor:style.borderColor}" fillcolor="${style.backgroundColor}">
                             <w:anchorlock/>
                             <center style="color:${style.color};font-family:${style.fontFamily};font-size:${style.fontSize};font-weight:${style.fontWeight};">${text}</center>
                             </v:roundrect>
                             <![endif]--><a href='${style.href}' id="mc${index}${newerId}" style="letter-spacing:${style.letterSpacing}px;lineHeight:${style.fontSize}px;font-weight:${style.fontWeight};text-transform:${style.textTransform};background-color:${style.backgroundColor};border:${style.borderWidth}px ${style.borderColor} ${style.borderStyle};border-radius:${style.borderBottomLeftRadius}px;color:${style.color};display:block;font-family:${style.fontFamily};padding:${style.paddingVert}px ${style.paddingHorz}px;font-size:${style.fontSize}px;font-weight:${style.fontWeight};text-align:center;text-decoration:none;width:${style.width.includes("px")?calcBtnPerc(style.width):`${style.width}`};-webkit-text-size-adjust:none;mso-hide:all;">${text}</a>
                             `}
                             </div>
                             {"\n"}
                                   {`<!-- END BUTTON -->`}
                                   {"\n"}
                                   </td>
                                 </tr>
                               </table>
                             </td>
                             </tr>                  
                                             }
                                             else if(title=="spacer"){
                                               return (
                                                 <tr>
                                                   <td  height={style.height} style={{height:style.height,lineHeight:style.height,fontSize:style.height}}>
                                                   {'&nbsp;'}
                                                   </td>
                                                 </tr>
                                               )
                                             }
                     })}
                      </table>

</td>
</tr>
                    
 </table> 
 
 </td>
 </tr>
     )
   }
   else if(title== "spacer"){
     return (
       <tr >
       <td  style={{fontSize:`${style.height}px`,lineHeight:`${style.height}px`}} height={imagify(style.height)}>
       {'&nbsp;'}
 
 </td>
 </tr>
     )
   }
    })}
    </table>
             
             {styling.backgroundImage?`
             </div>
 <!--[if gte mso 9]>
 </v:textbox>
 </v:fill>
 </v:rect>
 </v:image>
 <![endif]-->`:""}
     </td>
         </tr>
       
         </table>
       </td>
     </tr>
   </table>
         {"\n"}
         {`<!--END ${styling.href?styling.href:"ROW Container"} -->`}
         {"\n"}
         </>
 
 }
 else if(title="spacer"){
   return <table border="0" cellPadding="0" cellpadding="0" role='presentation' >
     <tr>
       {/* <td height={styling?.height} style={{lineHeight:`${styling.height}px`,fontSize:`${styling.height}px`}}>{'&nbsp;'}</td> */}
     </tr>
   </table>

 }
 })
 const initial=render(<Html>
 <Head>
   {`
   <!--[if gte mso 9]>
   <xml>
     <o:OfficeDocumentSettings>
     <o:AllowPNG/>
     <o:PixelsPerInch>96</o:PixelsPerInch>
     </o:OfficeDocumentSettings>
   </xml>
   <![endif]-->
   <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   <meta name="format-detection" content="date=no" />
   <meta name="format-detection" content="address=no" />
   <meta name="format-detection" content="telephone=no" />
   <meta name="x-apple-disable-message-reformatting" />
     <!--[if !mso]><!-->
        ${links}
     <!--<![endif]-->
   <title>Email Template</title>
   <!--[if gte mso 9]>
   <style type="text/css" media="all">
     sup { font-size: 100% !important; }
   </style>
   <![endif]-->
   
   
   
   <style type="text/css" media="screen">
   /* Linked Styles */
   a { color:#000001; text-decoration:none }
   p { padding:0 !important; margin:0 !important }
   img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
   .mcnPreviewText { display: none !important; }
   .text-footer2 a { color: #ffffff; } 
   
   /* Mobile styles */
   @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
     
     .mobile-shell { width: 100% !important; min-width: 100% !important; }
     
   .m-center { text-align: center !important; }
     .mobile-td {display:inline-block !important;padding:5px !important;}
     .m-left { text-align: left !important; margin-right: auto !important; }
     .m-justify { text-align: justify !important; margin-right: auto !important; }
     .m-right { text-align: right !important; margin-right: auto !important; }
     
     .center { margin: 0 auto !important; }
     .center-float {float:none!important; margin: auto!important; }
     .content2 { padding: 8px 15px 12px !important; }
     .t-left { float: left !important; margin-right: 30px !important; }
     .t-left-2  { float: left !important; }
     .t-right-2  { float: right !important; }
    
     .td { width: 100% !important; min-width: 100% !important;display:block !important }
     .tr { width: 100% !important; min-width: 100% !important;display:inline !important }
   

     .content { padding: 30px 15px !important; }
     .section { padding: 30px 15px 0px !important; }

     .m-br-15 { height: 15px !important; }
     .mpb5 { padding-bottom: 5px !important; }
     .mpb15 { padding-bottom: 15px !important; }
     .mpb20 { padding-bottom: 20px !important; }
     .mpb30 { padding-bottom: 30px !important; }
     .mp30 { padding-bottom: 30px !important; }
     .m-padder { padding: 0px 15px !important; }
     .m-padder2 { padding-left: 15px !important; padding-right: 15px !important; }
     .p70 { padding: 30px 0px !important; }
     .pt70 { padding-top: 30px !important; }
     .p0-15 { padding: 0px 15px !important; }
     .p30-15 { padding: 30px 15px !important; }			
     .p30-15-0 { padding: 30px 15px 0px 15px !important; }			
     .p0-15-30 { padding: 0px 15px 30px 15px !important; }			


     .text-footer { text-align: center !important; }

     .m-td,
     .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

     .m-block { display: block !important; }

     .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

     .column,
     .column-dir,
     .column-top,
     .column-empty,
     .column-top-30,
     .column-top-60,
     .column-empty2,
     .column-bottom { float: right !important; width: 100% !important; display: block !important; }

     .column-empty { padding-bottom: 15px !important; }
     .column-empty2 { padding-bottom: 30px !important; }

     .content-spacing { width: 15px !important; }
   }
 </style>`}
     </Head>
   <Body  className="bod" style={{padding:"0 !important", margin:"0 !important", display:"block !important", minWidth:"100% !important", width:"100% !important",backgroundColor:"#eeeeee",background:state.newContent?.body.emailBackground}} >
     <Container style={{margin:"0px auto",background:state.newContent?.body.background}}>
       {ht}
     </Container> 
     </Body>
     </Html>,{pretty:true}
   )
   return <div>
     {ht}
   </div>
// return JSON.stringify(state)
}

module.exports = Emailifier;