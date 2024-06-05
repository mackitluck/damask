import React from 'react';
import CustomeButton from '../CustomeButton/CustomeButton';
import CheckboxLabel from '../CheckboxLabel/CheckboxLabel';
import RadioLabel from '../RadioLabel/RadioLabel';
import InputGroups from '../InputGroups/InputGroups';
import SelectGroups from '../SelectGroups/SelectGroups';
import TextareaGroups from '../TextareaGroups/TextareaGroups';
import HeartLabel from '../HeartLabel/HeartLabel';



const Typo = () => {


  const selectData = ['one', 'two' ,'three'];


  return (
    <div className="typo">
      <h1>Display Large 57</h1>
      <h2>Display Medium 45</h2>
      <h3>Display Small 36</h3>
      <br />
      <h4>Headline Large 32</h4>
      <h5>Headline Medium 28</h5>
      <h6>Headline Small 24 </h6>
      <br />
      <p className="tl">Title Large 22</p>
      <p className="tm">Title Medium 16</p>
      <p className="ts">Title Small 14</p>
      <br />
      <p className="ll">Label Large 14</p>
      <p className="lm">Label Medium 12</p>
      <p className="ls">Label Small 11</p>
      <br />
      <span className="bl">Body Large 16</span><br />
      <span className="bm">Body Medium 14</span><br />
      <span className="bs">Body Small  12</span><br />
      <br />

      <CustomeButton bg="fill" disabled>Enabled</CustomeButton><br /><br />
      <CustomeButton>Enabled</CustomeButton><br />
      <br />

      <CheckboxLabel>Default</CheckboxLabel><br />
      <br />

      <RadioLabel>Default</RadioLabel><br />
      <br />

      <HeartLabel /><br />
      <br />

      <a className="share-icon"></a><br />
      <br />

      <InputGroups label="Label" error="Error Message" id="one" placeholder="enter name"/><br />
      <br />

      <SelectGroups label="Label" value={selectData} /><br />
      <br />

      <TextareaGroups label="Label" /><br />
      <br />


      
    </div>
  );
}

export default Typo;
