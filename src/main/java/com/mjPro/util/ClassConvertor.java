package com.mjPro.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
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

            // Get fields of class V
            Field[] fieldsV = objV.getClass().getDeclaredFields();

            // Iterate through fields in class V
            for (Field fieldV : fieldsV) {
                // Check if the field is annotated with FieldMapping
                String attributeNameV = fieldV.getName(); // Default mapping is attribute name
                if (fieldV.isAnnotationPresent(AttrMapping.class)) {
                    AttrMapping mapping = fieldV.getAnnotation(AttrMapping.class);
                    attributeNameV = mapping.value();
                }

                Field fieldU = objU.getClass().getDeclaredField(attributeNameV);
                fieldU.setAccessible(true);

                // Check if the attribute is a List
                if (fieldV.getType() == List.class) {
                    // It's a List
                    ParameterizedType listType = (ParameterizedType) fieldV.getGenericType();
                    Class<?> listClassV = (Class<?>) listType.getActualTypeArguments()[0];

                    List<Object> listU = (List<Object>) fieldU.get(objU);
                    List<Object> listV = new ArrayList<>();

                    for (Object itemU : listU) {
                        Object itemV = convertTo(itemU, listClassV);
                        listV.add(itemV);
                    }

                    fieldV.setAccessible(true);
                    fieldV.set(objV, listV);
                } else if (fieldV.getType().getClassLoader() != null) {
                    // It's a nested object
                    // Recursively convert nested objects
                    Object nestedObjU = fieldU.get(objU);
                    Class<?> nestedClassV = fieldV.getType();
                    Object nestedObjV = convertTo(nestedObjU, (Class<?>) nestedClassV);

                    fieldV.setAccessible(true);
                    fieldV.set(objV, nestedObjV);
                } else {
                    // It's a simple attribute
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