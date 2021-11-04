import { Select } from "semantic-ui-react";

const VitalsSelect = ({ onChange, placeholder }) => {
    const vitalsOptions = [
        { key: 'Heart rate', value: 'Heart rate', text: 'Heart Rate' },
        { key: 'Systolic blood pressure', value: 'Systolic blood pressure', text: 'Systolic Blood Pressure' },
        { key: 'Diastolic blood pressure', value: 'Diastolic blood pressure', text: 'Diastolic Blood Pressure' },
        { key: 'Body mass index (BMI) [Ratio]', value: 'Body mass index (BMI) [Ratio]', text: 'BMI' },
    ]
    return (
        <Select
            onChange={onChange}
            placeholder={placeholder}
            options={vitalsOptions}
        />
    )
}

export default VitalsSelect;