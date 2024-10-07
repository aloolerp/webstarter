
export interface ComponentItem{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Label : Data	*/
	label: string
	/**	Fieldname : Data	*/
	fieldname?: string
	/**	Fieldtype : Select	*/
	fieldtype: "Attach Image" | "Attach" | "Check" | "Data" | "Int" | "Link" | "Select" | "Small Text" | "Text" | "Markdown Editor" | "Section Break" | "Column Break" | "Table Break"
	/**	Mandatory : Check	*/
	reqd?: 0 | 1
	/**	Map Item : Check	*/
	map_item?: 0 | 1
	/**	Custom Map Item : Check	*/
	custom_map_item?: 0 | 1
	/**	In List View : Check	*/
	in_list_view?: 0 | 1
	/**	Options : Small Text	*/
	options?: string
	/**	Default : Small Text	*/
	default?: string
}