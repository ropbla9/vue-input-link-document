# vue-input-link-document

## Use example

`
<input-document
    :collection="clients" // Data collection to display autocomplete
    v-model="sale.clientID" // Value to sync
    @notfound="$event" // Distaches when search doesnt match anything, but returns what was searched in $event
    primaryProp="name" // First prop to display on autocomplete row (you want to set it as something of easily recognization like a name value because this one has no label to set)
    secondaryProp="driverLicenseId" // Second prop to display on autocomplete row
    secondaryPropLabel="Driver ID" // Label of secondary prop
    hashProp="_id" // That prop that will be actually be returned as components value
    hashPropLabel="ID Number" // A label for hash prop
    datalistID="InputDocumentClients" // Put anything just in order to distingish among other instances
    inputClass="mint-field-core" // Class to apply on inner native input
    placeholder="Insira um cliente" // Native input placeholder
    :required="true" /> // Native required
`