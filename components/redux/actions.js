
import * as Types from './types'


export function roleSelect(role)
{
  return {
		type: Types.ROLE_SELECT,
		role : role
	}
}

export function roleReset()
{
  return {
		type: Types.ROLE_RESET
  }
}



export function resourceFetchRequest(resource, keyBy = false)
{
  return {
		type: Types.RESOURCE_FETCH_REQUESTED,
		resource : resource,
    keyBy : keyBy
	}
}

export function resourceFetchSuccess(resource, data)
{
  return {
		type: Types.RESOURCE_FETCH_SUCCESS,
    resource : resource,
		data : data
	}
}

export function resourceFetchError(resource, error)
{
  return {
		type: Types.RESOURCE_FETCH_ERROR,
    resource : resource,
		error : error
	}
}

export function snackbarShow(payload)
{
  return {
		type: Types.SNACKBAR_SHOW,
		payload : payload
	}
}

export function snackbarHide()
{
  return {
    type: Types.SNACKBAR_HIDE
  }
}



export function drawerShow()
{
  return {
		type: Types.DRAWER_SHOW
	}
}

export function drawerHide()
{
  return {
    type: Types.DRAWER_HIDE
  }
}



export function dialogShow(payload = {})
{
  return {
		type: Types.DIALOG_SHOW,
		payload : payload
	}
}

export function dialogModify(name, value)
{
  return {
		type: Types.DIALOG_MODIFY,
		payload : payload
	}
}

export function dialogHide()
{
  return {
    type: Types.DIALOG_HIDE
  }
}




export function boothSelect(boothId)
{
  return {
		type: Types.BOOTH_SELECT,
		payload : boothId
	}
}


export function boothUnselect(boothId)
{
  return {
		type: Types.BOOTH_UNSELECT,
		payload : boothId
	}
}

export function boothsReset()
{
  return {
		type: Types.BOOTHS_RESET
	}
}


export function cartItemAdd(ticketId, quantity, formdata = {})
{
  return {
    type : Types.CART_ITEM_ADD,
    ticketId : ticketId,
    quantity : quantity,
    formdata : formdata
  }
}

export function cartItemRemove(ticketId, formdata)
{
  return {
    type : Types.CART_ITEM_REMOVE,
    ticketId : ticketId,
    formdata : formdata
  }
}

export function cartReset()
{
  return {
    type : Types.CART_RESET
  }
}