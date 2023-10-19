package com.mjPro.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ClassConvertor {
	public static <U, V> V convertTo(U objU, Class<V> classV) {
		if (objU == null) {
			throw new IllegalArgumentException("Input object cannot be null.");
		}
		
		V objV  = null;
		try {
			 objV = classV.getDeclaredConstructor().newInstance();
			// Get fields of class U
			Field[] fieldsU = objU.getClass().getDeclaredFields();

			// Iterate through fields in class U
			for (Field fieldU : fieldsU) {
				// Check if the field is annotated with FieldMapping
				String attributeNameU = fieldU.getName(); // Default mapping is attribute name
				if (fieldU.isAnnotationPresent(AttrMapping.class)) {
					AttrMapping mapping = fieldU.getAnnotation(AttrMapping.class);
					attributeNameU = mapping.value();
				}

				fieldU.setAccessible(true);

				// Check if the attribute is a nested object
				if (fieldU.getType().getClassLoader() != null) {
					// It's a nested object
					// Recursively convert nested objects
					Class<?> nestedClassV = objV.getClass().getDeclaredField(attributeNameU).getType();
					Field nestedFieldU = objU.getClass().getDeclaredField(fieldU.getName());
					Object nestedObjU = nestedFieldU.get(objU);
					Object nestedObjV = convertTo(nestedObjU, (Class<?>) nestedClassV);

					Field fieldV = objV.getClass().getDeclaredField(attributeNameU);
					fieldV.setAccessible(true);
					fieldV.set(objV, nestedObjV);
				} else {
					// It's a simple attribute
					Field fieldV = objV.getClass().getDeclaredField(attributeNameU);
					fieldV.setAccessible(true);
					fieldV.set(objV, fieldU.get(objU));
				}
			}

		} catch (InstantiationException | SecurityException | NoSuchMethodException | IllegalAccessException
				| InvocationTargetException | NoSuchFieldException | IllegalArgumentException e) {
			e.printStackTrace();
		}
		return objV;
	}

	public static <U, V> List<V> convertList(Collection<U> uList, Class<V> classV){
		List<V> resultList = new ArrayList<>();

		for (U u : uList) {
			V v = convertTo(u, classV);
			resultList.add(v);
		}

		return resultList;
	}
}